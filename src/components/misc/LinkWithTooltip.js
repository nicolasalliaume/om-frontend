import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function LinkWithTooltip(props) {
	return [
		<Link to={props.to} id={props.id}>
			{props.children}
		</Link>,
		<UncontrolledTooltip placement="right" target={props.id} delay={{show: 3, hide: 0}}>
			{props.tooltip}
		</UncontrolledTooltip>
	]
}