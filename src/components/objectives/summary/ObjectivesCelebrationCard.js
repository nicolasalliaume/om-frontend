import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function ObjectivesCelebrationCard(props) {
	const style = props.celebrationStyle;
	return (
		<Card className={`summary-card celebration style-${style}`}>
			<CardBlock className='card-body'>
				<CardTitle><b>Oh yeah</b>, baby</CardTitle>
			</CardBlock>
		</Card>
	)
}