import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInvoicesListIfNeeded } from '../../../actions/billing';
import InvoicesList from './InvoicesList';

class LatestInvoicesList extends Component {
	componentWillMount() {
		this.props.fetchInvoicesListIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchInvoicesListIfNeeded();
	}
	/**
	 * Returns last X invoices sorted by created timestamp
	 * @return {Array}
	 */
	getLatestInvoices() {
		const { invoicesList, direction } = this.props;
		const { invoices } = invoicesList;
		return invoices.filter(i => i.direction === direction).slice(0, 5);
	}
	render() {
		const invoices = this.getLatestInvoices();
		return <InvoicesList invoices={invoices} />
	}
}

const mapStateToProps = (state, props) => { return {
	invoicesList: state.billingView.invoicesList,
	...props
}}

const mapDispatchToProps = dispatch => { return {
	fetchInvoicesListIfNeeded : () => dispatch(fetchInvoicesListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(LatestInvoicesList);