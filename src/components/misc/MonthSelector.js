import React from 'react';
import { Input } from 'reactstrap';

function withZero(i) {
	return String(i+100).substring(1);
}

export default function MonthSelector(props) {
	const options = [];
	for (var i = 1; i < 12; i++) {
		options.push({ value: withZero(i), label: withZero(i) })
	}

	return (
		<Input type="select" 
			className='month-selector'
			value={props.value} 
			onChange={e => props.onChange(e.target.value)}>
			
			{ options.map((i) => 
				<option key={i.label} value={i.value}>{i.label}</option>
			)}
		</Input>
	)
}