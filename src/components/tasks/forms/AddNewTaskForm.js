import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
import moment from 'moment';
import EntityCombo from './../../misc/EntityCombo';
import { fetchProjectsListIfNeeded } from './../../../actions/projects';
import { createTask, invalidateTasksList } from './../../../actions/tasks';
import { 
	Row, 
	Col, 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter, 
	Form, 
	FormGroup, 
	Label, 
	Input, 
	FormText 
} from 'reactstrap';

class AddNewTaskForm extends Component {
	constructor() {
		super();
		this.state = this.newTaskState()
	}
	createTask = () => {
		this.props.createTask(this.state.task);
		this.props.invalidateTasksList();
		this.reset()
	}
	reset = () => {
		this.setState(this.newTaskState()); 
	}
	newTaskState = () => { return {
		task : { 
			title: '',
			tags: [],
			project: '',
			origin: "web",
			description: '' 
		}
	}}
	taskPropChanged = (event) => {
		const { name, value } = event.target;
		this.setState(update(this.state, {task: {[name]: {$set: value}}}))
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
		const { task } = this.state;
		const { fetchProjects, projectsById } = this.props;
		const projects = this.getProjectOptions(projectsById);
		return (
			<Form>
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
				<FormGroup row className='flex-row-reverse'>
					<Col xs={2}>
						<Button color="primary" onClick={this.createTask}>Create</Button>
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
    createTask : (task) => dispatch(createTask(task)),
    invalidateTasksList : () => dispatch(invalidateTasksList()),
    fetchProjects : () => dispatch(fetchProjectsListIfNeeded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTaskForm);
