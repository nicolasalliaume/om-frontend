import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
import { createTask, createTaskAndObjective } from './../../../actions/tasks';
import { 
	Row, 
	Col, 
	Button 
} from 'reactstrap';
import EditTaskForm from './EditTaskForm';

class AddNewTaskForm extends Component {
	constructor() {
		super();
		this.state = this.newTaskState()
	}
	
	createTask = () => {
		this.props.createTask(this.state.task);
		this.reset()
	}

	createTaskAndObjective = () => {
		this.props.createTaskAndObjective(this.state.task);
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
			description: '',
			created_by: localStorage.getItem('currentUser')
		}
	}}
	
	taskChanged = (task) => {
		this.setState(update(this.state, {task: {$set: task}}))
	}
	render() {
		const { task } = this.state;
		return (
			<div>
				<EditTaskForm task={task} onChange={this.taskChanged} />
				<Row className='flex-row-reverse'>
					<Col xs={4}>
						<Button color="primary form-control" onClick={this.createTaskAndObjective}>Create + objective</Button>
					</Col>
					<Col xs={2}>
						<Button color="primary form-control" onClick={this.createTask}>Create</Button>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return {
    createTask : (task) => dispatch(createTask(task)),
    createTaskAndObjective : (task) => dispatch(createTaskAndObjective(task)),
  }
}

export default connect(null, mapDispatchToProps)(AddNewTaskForm);
