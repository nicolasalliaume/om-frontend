import React from 'react';

export default function HtmlDescription(props) {
	const { description } = props;
	return (
		<div className='task-email-body' dangerouslySetInnerHTML={{__html: description}}></div>
	);
}