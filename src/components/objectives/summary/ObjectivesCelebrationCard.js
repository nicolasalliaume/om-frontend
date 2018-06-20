import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

export default function ObjectivesCelebrationCard(props) {
	const style = props.celebrationStyle;
	return (
		<Card className={`summary-card celebration style-${style}`}>
			<CardBody >
				<CardTitle><b>Oh yeah</b>, baby</CardTitle>
			</CardBody>
		</Card>
	)
}