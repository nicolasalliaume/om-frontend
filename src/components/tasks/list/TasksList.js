import React, { Component } from 'react';
import TasksListItem from './TasksListItem';

export default function TasksList(props) {
	let { tasks, indexStart } = props;
	if (!indexStart) indexStart = 0;
	return (
		<ul className='tasks-list'>
			{ tasks && tasks.map((t, idx) => 
				<TasksListItem key={t._id} index={indexStart + idx} task={t} />) }
		</ul>
	)
}