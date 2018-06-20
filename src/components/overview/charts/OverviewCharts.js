import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import IncomeVsObjectiveChart from './IncomeVsObjectiveChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import BillingOverviewCard from  '../cards/BillingOverviewCard';

export default class OverviewCharts extends Component {
	render() {
		const { invoices, start, end, objective } = this.props;
		const billingInvoices = invoices.filter(i => i.direction === 'out');
		const expensesInvoices = invoices.filter(i => i.direction === 'in');

		return (
			<div>
				<Row className='year-overview-chart'>
					<Col xs={12}>
						<Card>
							<CardBody >
								<CardTitle><b>Year billing</b> overview</CardTitle>
								<IncomeVsObjectiveChart invoices={billingInvoices}
									objective={objective}
									start={start}
									end={end} />
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row className='year-income-vs-expenses-chart'>
					<Col xs={12} lg={6}>
						<Card>
							<CardBody >
								<CardTitle>Year <b>Expenses vs. Billing</b></CardTitle>
								<IncomeVsExpensesChart invoices={invoices}
									objective={objective}
									start={start}
									end={end} />
							</CardBody>
						</Card>
					</Col>
					<Col xs={6} lg={3} className='overview-billing-cards'>
						<BillingOverviewCard 
							className='year-expenses-card smaller-title'
							amount={this.getYearExpenses(expensesInvoices)} 
							title={'Year <b>expenses</b>'} />
					</Col>
					<Col xs={6} lg={3} className='overview-billing-cards'>
						<BillingOverviewCard 
							className='year-margin-card smaller-title'
							amount={this.getYearMargin(invoices)} 
							title={'Year <b>profit</b>'} />
					</Col>
				</Row>
			</div>
		)
	}

	getYearExpenses = (invoices) => invoices.reduce((sum, i) => sum + i.amount, 0)

	getYearMargin = (invoices) => (
		Math.round(invoices.reduce((res, i) => res + (i.amount * (i.direction === 'out' ? 1 : -1)), 0))
	)
}