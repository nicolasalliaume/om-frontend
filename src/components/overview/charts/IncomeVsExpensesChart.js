import React, { Component } from 'react';
import BarsVsChart from './BarsVsChart';
import moment from 'moment';

export default class IncomeVsExpensesChart extends Component {
	render() {
		return (
			<BarsVsChart 
				labels={this.getMonthsLabels()}
				bars1={this.getIncomeBars()} 
				bars2={this.getExpensesBars()} />
		)
	}

	getIncomeBars = () => ({
		label: 'Billing',
		data: this.getBillingDataPerMonth()
	})

	getExpensesBars = () => ({
		label: 'Expenses',
		data: this.getExpensesDataPerMonth()
	})

	getMonthsLabels() {
		const start = this.props.start.clone();
		const labels = [];
		for (var i = 0; i < 12; i++) {
			labels.push(start.format('MMM'));
			start.add(1, 'month');
		}
		return labels;
	}

	/**
	 * Returns an array that is used by the chart to show the billing
	 * amount per month
	 * 
	 * @return {Array} 
	 */
	getBillingDataPerMonth() {
		const invoices = this.props.invoices.filter(i => i.direction === 'out');
		return this.getInvoicesAmountPerMonth(invoices);
	}

	/**
	 * Returns an array that is used by the chart to show the expenses
	 * amount per month
	 * 
	 * @return {Array} 
	 */
	getExpensesDataPerMonth() {
		const invoices = this.props.invoices.filter(i => i.direction === 'in');
		return this.getInvoicesAmountPerMonth(invoices).map(v => v*-1);
	}

	/**
	 * Returns an array that is used by the chart to show the added
	 * amount per month for the given invoices
	 * 
	 * @return {Array} 
	 */
	getInvoicesAmountPerMonth(invoices) {
		const amountPerMonth = {};
		const visibleMonths = this.getMonthsLabels();
		visibleMonths.forEach(m => { amountPerMonth[m] = 0 });

		// add up all invoices by month
		invoices.forEach(i => {
			const invoiceDate = moment(i.invoicing_date);
			const month = invoiceDate.format('MMM');
			amountPerMonth[month] += i.amount;
		})

		// return as array but in the same order as the labels
		return visibleMonths.map(m => amountPerMonth[m]);
	}
}