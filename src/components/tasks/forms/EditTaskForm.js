import React, { Component } from 'react';
import update from 'immutability-helper';
import { 
	Col, 
	Form, 
	FormGroup, 
	Label, 
	Input
} from 'reactstrap';
import TagsInput from './../../misc/TagsInput';
import ProjectsCombo from './../../projects/utils/ProjectsCombo';
import { and } from '../../../utils';

export default class EditTaskForm extends Component {
	constructor() {
		super();
		this.state = { validation: { title: true, project: true } }
	}

	taskPropChanged = (event) => {
		this.props.onChange(update(
			this.props.task, {[event.target.name] : {$set: event.target.value}}));
	}
	
	render() {
		const { task } = this.props;
		const { validation } = this.state;
		return (
			<Form className='edit-task-form' onSubmit={e => e.preventDefault() && false}>
				<FormGroup row>
					<Label for="title" sm={2}>Title</Label>
					<Col sm={10}>
						<Input type="text" name="title" id="title" 
							invalid={!validation.title}
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
					<Label for="tags" sm={2}>Tags</Label>
					<Col sm={10}>
						<TagsInput name='tags' value={task.tags} id="tags" 
							onChange={this.taskPropChanged} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Project</Label>
					<Col sm={10}>
						<ProjectsCombo name='project' value={task.project} 
							invalid={!validation.project}
							onChange={this.taskPropChanged} />
					</Col>
				</FormGroup>
			</Form>
		)
	}

	validate = () => {
		const validation = {
			title : this.props.task.title !== '',
			project : this.props.task.project !== ''
		}
		this.setState({ validation });
		return and(Object.values(validation));
	}
}
