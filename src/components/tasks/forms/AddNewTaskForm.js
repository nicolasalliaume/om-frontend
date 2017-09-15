import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
import moment from 'moment';
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
		this.state = {
			task : {
				title 	: '',
				tags 	: ["sample"],
				project : '59b56a66fb6a2913115d00cd',
				origin 	: "web"
			}
		}
	}
	createTask = () => {
		this.props.createTask(this.state.task);
		this.props.invalidateTasksList();
	}
	taskPropChanged = (event) => {
		const { name, value } = event.target;
		this.setState(update(this.state, {task: {[name]: {$set: value}}}))
	}
	render() {
		const { task } = this.state;
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
					<Label sm={2}>Project</Label>
					<Col sm={10}>
						<Input type="select" name="project" id="project" value={task.project}
								onChange={this.taskPropChanged}>
							<option value='59b56a66fb6a2913115d00cd'>Sample project</option>
						</Input>
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

const mapDispatchToProps = dispatch => {
  return {
    createTask : (task) => dispatch(createTask(task)),
    invalidateTasksList : () => dispatch(invalidateTasksList())
  }
}

export default connect(null, mapDispatchToProps)(AddNewTaskForm);
