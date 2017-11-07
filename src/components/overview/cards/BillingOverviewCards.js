import React, { Component } from 'react';
import BillingOverviewCard from  './BillingOverviewCard';
import moment from 'moment';

export default class BillingOverviewCards extends Component {
	render() {
		const { objective, invoices } = this.props;
		const billingInvoices = invoices.filter(i => i.direction === 'out');

		return (
			<div className='overview-billing-cards'>
				<BillingOverviewCard 
					className='year-objective-card'
					amount={objective*12} 
					title={'<b>Year</b> objective'} />

				<BillingOverviewCard 
					className='year-actual-card'
					amount={this.getTotalYearBilling(billingInvoices)} 
					title={'<b>Year</b> actual'} />

				<BillingOverviewCard 
					className='monthly-objective-card'
					amount={objective} 
					title={'<b>Monthly</b> objective'} />

				<BillingOverviewCard 
					className='monthly-avg-card'
					amount={this.getAvgMonthlyBilling(billingInvoices)} 
					title={'<b>Monthly</b> avg'} />
			</div>
		)
	}

	getTotalYearBilling = (invoices) => (
		Math.round(invoices.reduce((a,i) => a + i.amount, 0)))

	getAvgMonthlyBilling = (invoices) => {
		const start = this.props.start;
		const total = this.getTotalYearBilling(invoices);
		const monthsOfData = moment().startOf('month').diff(start, 'months', true) + 1;
		return Math.round(total / monthsOfData);
	}
}