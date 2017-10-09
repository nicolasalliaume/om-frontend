import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';
import InvoicesList from './InvoicesList';

class LatestInvoicesList extends Component {
	componentDidMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	/**
	 * Returns last 5 invoices sorted by created timestamp
	 * @return {Array}
	 */
	getLatestInvoices() {
		const invoices = this.props.projects
			.map(p => p.invoices)
			.reduce((all, invoices) => all.concat(invoices), []);
		invoices.sort((a, b) => a.created_ts < b.created_ts);
		return invoices.slice(0, 5);
	}
	render() {
		const invoices = this.getLatestInvoices();
		return <InvoicesList invoices={invoices} />
	}
}

const mapStateToProps = state => { return {
	projects: state.billingView.projectsBilling.projects
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(LatestInvoicesList);