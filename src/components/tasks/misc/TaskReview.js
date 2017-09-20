import React from 'react';

export default function TaskReview(props) {
	const { task } = props;
	return (
		<div className='task-review'>
			<h6>{task.project.name}</h6>
			<h4>{task.title}</h4>
			<p>{task.description.trimToWords(400)}</p>
		</div>
	)
}