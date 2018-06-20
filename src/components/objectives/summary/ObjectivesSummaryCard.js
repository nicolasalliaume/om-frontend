import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Progress } from 'reactstrap';

export default class ObjectivesSummaryCard extends Component {
	render() {
		const { type, title, description, label, progress, color } = this.props;
		const percentProgress = parseInt(progress * 100, 10);
		return (
			<Card className={`summary-card ${type || ''}`}>
				<CardBody >
					<CardTitle dangerouslySetInnerHTML={{__html: title}} />
					<p className='text-center description'>{description}</p>
					<Progress animated className={color} color={color} value={percentProgress} />
					<p className='text-center label' dangerouslySetInnerHTML={{__html: label}} />
				</CardBody>
			</Card>
		)
	}
}