import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import IncomeVsObjectiveChart from './IncomeVsObjectiveChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';

export default class OverviewCharts extends Component {
	render() {
		const { invoices } = this.props;
		const billingInvoices = invoices.filter(i => i.direction === 'out');

		return (
			<div>
				<Row className='year-overview-chart'>
					<Col xs={12}>
						<Card>
							<CardBlock className='card-body'>
								<CardTitle><b>Year billing</b> overview</CardTitle>
								<IncomeVsObjectiveChart invoices={billingInvoices}
									objective={this.props.objective}
									start={this.props.start}
									end={this.props.end} />
							</CardBlock>
						</Card>
					</Col>
				</Row>
				<Row className='year-income-vs-expenses-chart'>
					<Col xs={6}>
						<Card>
							<CardBlock className='card-body'>
								<CardTitle>Year <b>Expenses vs. Billing</b></CardTitle>
								<IncomeVsExpensesChart invoices={invoices}
									objective={this.props.objective}
									start={this.props.start}
									end={this.props.end} />
							</CardBlock>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}