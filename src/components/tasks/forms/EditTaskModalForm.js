import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from 'reactstrap';
import EditTaskForm from './EditTaskForm';
import { updateTask } from './../../../actions/tasks';

class EditTaskModalForm extends Component {
	constructor() {
		super();
		this.state = { task : null }
	}
	componentWillMount() {
		this.setState({ task : this.flattenReferences(this.props.task) });
	}
	flattenReferences = (task) => update(task, {project: {$set: task.project._id}})
	submitTask = () => {
		this.props.updateTask(this.state.task._id, this.state.task);
		this.props.toggle();
	}
	onFormChange = (task) => {
		this.setState({task : task});
	}
	render() {
		const { task } = this.state;
		const { toggle, show } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}>Edit <b>task</b></ModalHeader>
				<ModalBody>
					<EditTaskForm onChange={this.onFormChange} task={task} />
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submitTask}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    updateTask : (taskId, update) => dispatch(updateTask(taskId, update))
}}

export default connect(null, mapDispatchToProps)(EditTaskModalForm);
