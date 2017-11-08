import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import IncomeVsObjectiveChart from './IncomeVsObjectiveChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import BillingOverviewCard from  '../cards/BillingOverviewCard';

export default class OverviewCharts extends Component {
	render() {
		const { invoices } = this.props;
		const billingInvoices = invoices.filter(i => i.direction === 'out');
		const expensesInvoices = invoices.filter(i => i.direction === 'in');

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
					<Col xs={3} className='overview-billing-cards'>
						<BillingOverviewCard 
							className='year-expenses-card smaller-title'
							amount={this.getYearExpenses(expensesInvoices)} 
							title={'Year <b>expenses</b>'} />
					</Col>
					<Col xs={3} className='overview-billing-cards'>
						<BillingOverviewCard 
							className='year-margin-card smaller-title'
							amount={this.getYearMargin(invoices)} 
							title={'Year <b>margin</b>'} />
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