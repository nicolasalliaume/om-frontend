import React from 'react';
import {
	Row,
	Col
} from 'reactstrap';

export default function WorkEntriesListExportingButtons(props) {
	return (
		<Row className='work-entries-options'>
			<Col xs={12} className='text-center'>
				{ props.options.map((o, idx) => (
					<a key={idx} href={o.url} target='_blank' rel='nofollow noopener' 
						className='btn btn-secondary'>
						{o.label}
					</a>					
				)) }
			</Col>
		</Row>
	);
}