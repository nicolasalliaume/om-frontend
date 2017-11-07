import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function MonthlyObjectiveCard(props) {
	return (
		<Card className='monthly-objective-card'>
			<CardBlock className='card-body'>
				<CardTitle><b>Monthly</b> objective</CardTitle>
				<div className='monthly-objective-amount text-center money'>{props.objective}</div>
			</CardBlock>
		</Card>
	)
}
