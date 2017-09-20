import React, { Component } from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { 
	Col, 
	Form, 
	FormGroup, 
	Label, 
	Input
} from 'reactstrap';
import EntityCombo from './../../misc/EntityCombo';
import { fetchProjectsListIfNeeded } from './../../../actions/projects';

class EditTaskForm extends Component {
	taskPropChanged = (event) => {
		this.props.onChange(update(this.props.task, 
			{[event.target.name] : {$set: event.target.value}}));
	}
	projectSelected = (project) => {
		this.taskPropChanged({ target: {name: 'project', value: project} })
	}
	getProjectOptions = (projectsById) => {
		return Object.values(projectsById).map(p => {
			return {label: p.name, value: p._id}
		})
	}
	render() {
		const { task } = this.props;
		const { fetchProjects, projectsById } = this.props;
		const projects = this.getProjectOptions(projectsById);
		return (
			<Form className='edit-task-form' onSubmit={e => e.preventDefault() && false}>
				<FormGroup row>
					<Label for="title" sm={2}>Title</Label>
					<Col sm={10}>
						<Input type="text" name="title" id="title" 
							onChange={this.taskPropChanged}
							placeholder="Find the cure for..." value={task.title} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="description" sm={2}>Description</Label>
					<Col sm={10}>
						<Input type="textarea" name="description" id="description" 
							onChange={this.taskPropChanged}
							placeholder="Need further details?" value={task.description} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Project</Label>
					<Col sm={10}>
						<EntityCombo async items={projects} fetchItems={fetchProjects} 
							value={task.project} onChange={this.projectSelected} />
					</Col>
				</FormGroup>
			</Form>
		)
	}
}

const mapStateToProps = state => { return {
	projectsById : state.cache.projects ? state.cache.projects.projectsById : {}
}}

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects : () => dispatch(fetchProjectsListIfNeeded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskForm);
