import React from 'react';
import moment from 'moment';
import { Input } from 'reactstrap';

export default function YearSelector(props) {
	const options = [];
	for (var i = 0; i < 3; i++) {
		const date = moment.utc().startOf('year').add(-i, 'year');
		options.push({ value: date.format('YYYY-MM-DD'), label: date.get('year') })
	}

	return (
		<Input type="select" 
			className='year-selector'
			value={props.value} 
			onChange={e => props.onChange(e.target.value)}>
			
			{ options.map((i) => 
				<option key={i.label} value={i.value}>{i.label}</option>
			)}
		</Input>
	)
}