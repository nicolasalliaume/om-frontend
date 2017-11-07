import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import IncomeVsObjectiveChart from './IncomeVsObjectiveChart';

export default class OverviewCharts extends Component {
	render() {
		const invoices = this.props.invoices
			.filter(i => i.direction === 'out');

		return (
			<Row className='year-overview-chart'>
				<Col xs={12}>
					<Card>
						<CardBlock className='card-body'>
							<CardTitle><b>Year billing</b> overview</CardTitle>
							<IncomeVsObjectiveChart invoices={invoices}
								objective={this.props.objective}
								start={this.props.start}
								end={this.props.end} />
						</CardBlock>
					</Card>
				</Col>
			</Row>
		)
	}
}