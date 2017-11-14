import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import OverviewCharts from '../components/overview/charts/OverviewCharts';
import BillingOverviewCards from '../components/overview/cards/BillingOverviewCards';
import { fetchInvoicesListIfNeeded } from '../actions/billing';

import './../styles/CompanyOverview.css';


const MONTHLY_INCOME_OBJECTIVE = 15000;

class CompanyOverview extends Component {
	
	componentWillMount() {
		this.props.fetchInvoicesListIfNeeded();
	}
	
	componentWillReceiveProps(props) {
		this.props.fetchInvoicesListIfNeeded();
	}

	render() {
		const invoices = this.getInvoicesForVisiblePeriod();
		const start = this.getPeriodStart();
		const end = this.getPeriodEnd();

		return (
			<div className='overview'>
				<Row>
					<Col lg={9} xs={12} className='order-sm-2 order-lg-1'>
						<OverviewCharts invoices={invoices} 
							objective={MONTHLY_INCOME_OBJECTIVE}
							start={start} 
							end={end} />
					</Col>
					<Col lg={3} xs={12} className='order-sm-1 order-lg-2'>
						<BillingOverviewCards invoices={invoices}
							objective={MONTHLY_INCOME_OBJECTIVE}
							start={start}
							end={end} />
					</Col>
				</Row>
			</div>
		)
	}

	getPeriodStart = () => moment().startOf('year')
	getPeriodEnd = () => this.getPeriodStart().clone().add(11, 'month').endOf('month')

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
