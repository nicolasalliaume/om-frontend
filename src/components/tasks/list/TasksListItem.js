import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createObjectiveFromTask } from './../../../actions/objectives';
import { withRouter } from 'react-router-dom';

class TasksListItem extends Component {
	addToObjectives = () => {
		const { task, createObjectiveFromTask } = this.props;
		createObjectiveFromTask(task);
		this.navigateToDashboard();
	}
	navigateToDashboard() {
		this.props.history.push('/');
	}
	render() {
		const { task, index } = this.props;
		return (
			<li className='tasks-list-item row'>
				<Col xs={1}>
					<p className='list-number'>{index+1}</p>
				</Col>
				<Col xs={11}>
					<h4>{task.title}</h4>
					{ task.description && <p>{task.description}</p> }
				</Col>
				<Col xs={12} className='text-right'>
					<Button color='primary' onClick={this.addToObjectives}>> make it an objective</Button>
				</Col>
			</li>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createObjectiveFromTask : (task) => dispatch(createObjectiveFromTask(task))
	}
}

export default withRouter(connect(null, mapDispatchToProps)(TasksListItem));