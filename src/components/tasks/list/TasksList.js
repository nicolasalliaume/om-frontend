import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasksListPage } from './../../../actions/tasks';

import TasksListItem from './TasksListItem';

class TasksList extends Component {
	render() {
		const { tasks } = this.props;
		return (
			<ul className='tasks-list'>
				{ tasks && tasks.map((t, idx) => 
					<TasksListItem key={t._id} index={idx} task={t} />) }
			</ul>
		)
	}
}

const mapStateToProps = state => {
	const { tasksByPage } = state.tasksView.tasksList;
	const { visiblePage } = state.tasksView;
	return {
		tasks : tasksByPage[visiblePage]
  	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTasksPage : dispatch(fetchTasksListPage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);