import React, { Component } from 'react';
import MixedBarsLineChart from './MixedBarsLineChart';
import moment from 'moment';

export default class IncomeVsObjectiveChart extends Component {
	render() {
		return (
			<MixedBarsLineChart 
				labels={this.getMonthsLabels()}
				bars={this.getBarsConfig()} 
				line={this.getLineConfig()} 
				avg={this.getAverage()} />
		)
	}

	getBarsConfig = () => ({
		label: 'Billing',
		data: this.getBillingDataPerMonth()
	})

	getLineConfig = () => ({
		label: 'Objective',
		data: this.getLineData()
	})

	getLineData = () => {
		return [0,0,0,0,0,0,0,0,0,0,0,0].map(_ => this.props.objective);
	}

	getMonthsLabels() {
		const start = this.props.start.clone();
		const labels = [];
		for (var i = 0; i < 12; i++) {
			labels.push(start.format('MMM'));
			start.add(1, 'month');
		}
		return labels;
	}

	getAverage() {
		const { end } = this.props;
		const invoices = this.props.invoices;
		const total = invoices.reduce((s,i) => s + i.amount, 0);
		// determine last month of data. if we're looking at
		// this year, then we'll use the current month. otherwise
		// use last month of the visible year
		const now = moment();
		const lastMonth = end > now ? now : end;
		const month = lastMonth.format('MMM');
		const monthsOfData = this.getMonthsLabels().indexOf(month) + 1;
		return total / monthsOfData;
	}

	/**
	 * Returns an array that is used by the chart to show the billing
	 * amount per month
	 * 
	 * @return {Array} 
	 */
	getBillingDataPerMonth() {
		const invoices = this.props.invoices;

		const billingByMonth = {};
		const visibleMonths = this.getMonthsLabels();
		visibleMonths.forEach(m => { billingByMonth[m] = 0 });

		// add up all invoices by month
		invoices.forEach(i => {
			const invoiceDate = moment(i.invoicing_date);
			const month = invoiceDate.format('MMM');
			billingByMonth[month] += i.amount;
		})

		// return as array but in the same order as the labels
		return visibleMonths.map(m => billingByMonth[m]);
	}
}