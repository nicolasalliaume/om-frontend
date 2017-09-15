import React, { Component } from 'react';
import { Card, CardBlock, CardTitle, Progress } from 'reactstrap';

export default class ObjectivesSummaryCard extends Component {
	render() {
		const { type, title, description, label, progress, color } = this.props;
		const percentProgress = parseInt(progress * 100);
		return (
			<Card className={`summary-card ${type || ''}`}>
				<CardBlock className='card-body'>
					<CardTitle dangerouslySetInnerHTML={{__html: title}} />
					<p className='text-center description'>{description}</p>
					<Progress animated className={color} color={color} value={percentProgress} />
					<p className='text-center label' dangerouslySetInnerHTML={{__html: label}} />
				</CardBlock>
			</Card>
		)
	}
}