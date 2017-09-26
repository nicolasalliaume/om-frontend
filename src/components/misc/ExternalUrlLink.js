import React from 'react';
import Icon from './Icon';

export default function ExternalUrlLink(props) {
	return (
		<a href={props.url} target='_blank' rel='nofollow noopener' 
			className='btn btn-secondary'>	
			<Icon fa-external-link tooltip={props.tooltip} id={props.id} />
		</a>
	)
}