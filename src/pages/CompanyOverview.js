import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import OverviewCharts from '../components/overview/charts/OverviewCharts';
import YearObjectiveCard from '../components/overview/cards/YearObjectiveCard';
import MonthlyObjectiveCard from '../components/overview/cards/MonthlyObjectiveCard';
import BillingOverviewCard from '../components/overview/cards/BillingOverviewCard';
import { fetchInvoicesListIfNeeded } from '../actions/billing';

import './../styles/CompanyOverview.css';


const MONTHLY_INCOME_OBJECTIVE = 14000;

class CompanyOverview extends Component {
	
	componentWillMount() {
		this.props.fetchInvoicesListIfNeeded();
	}
	
	componentWillReceiveProps(props) {
		this.props.fetchInvoicesListIfNeeded();
	}

	render() {
		const invoices = this.getInvoicesForVisiblePeriod();

		return (
			<div className='overview'>
				<Row>
					<Col lg={9} xs={12}>
						<OverviewCharts invoices={invoices} 
							objective={MONTHLY_INCOME_OBJECTIVE}
							start={this.getPeriodStart()} 
							end={this.getPeriodEnd()} />
					</Col>
					<Col lg={3} xs={6}>
						<BillingOverviewCard 
							className='year-objective-card'
							amount={MONTHLY_INCOME_OBJECTIVE*12} 
							title={'<b>Year</b> objective'} />

						<BillingOverviewCard 
							className='year-actual-card'
							amount={this.getTotalYearBilling(invoices)} 
							title={'<b>Year</b> actual'} />

						<BillingOverviewCard 
							className='monthly-objective-card'
							amount={MONTHLY_INCOME_OBJECTIVE} 
							title={'<b>Monthly</b> objective'} />

						<BillingOverviewCard 
							className='monthly-actual-card'
							amount={this.getAvgMonthlyBilling(invoices)} 
							title={'<b>Monthly</b> actual'} />
					</Col>
				</Row>
			</div>
		)
	}

	getPeriodStart = () => moment().startOf('year')
	getPeriodEnd = () => this.getPeriodStart().clone().add(11, 'month').endOf('month')

	getTotalYearBilling = (invoices) => (
		invoices.reduce((a,i) => a + i.amount, 0))

	getAvgMonthlyBilling = (invoices) => {
		const total = this.getTotalYearBilling(invoices);
		const diff = moment().startOf('month').diff(this.getPeriodStart(), 'months', true);
		console.log(diff);
		return total/diff;
	}

	/**
	 * Returns the invoices that are gonna be used for the overview
	 * (withing the date range of the visible period).
	 * 
	 * @return {Array}
	 */
	getInvoicesForVisiblePeriod() {
		const { invoices } = this.props.invoicesList;
		const start = this.getPeriodStart();
		const end = this.getPeriodEnd();

		return invoices.filter(i => {
			const invoiceDate = moment(i.invoicing_date);
			return invoiceDate >= start && invoiceDate <= end;
		})
	}
}

const mapStateToProps = state => ({
	invoicesList : state.billingView.invoicesList
})

const mapDispatchToProps = dispatch => ({
	fetchInvoicesListIfNeeded : () => dispatch(fetchInvoicesListIfNeeded())
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);
