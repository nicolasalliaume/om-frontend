import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function YearObjectiveCard(props) {
	return (
		<Card className='year-objective-card'>
			<CardBlock className='card-body'>
				<CardTitle><b>Year</b> objective</CardTitle>
				<div className='year-objective-amount text-center money'>{props.objective}</div>
			</CardBlock>
		</Card>
	)
}