import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';
import InvoicesList from './InvoicesList';

class LatestInvoicesList extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	/**
	 * Returns last X invoices sorted by created timestamp
	 * @return {Array}
	 */
	getLatestInvoices() {
		const { projects } = this.props;
		if (!projects) return [];

		const invoices = projects
			.map(p => p.invoices)
			.map(invoices => invoices.filter(i => i.direction === 'out'))
			.reduce((all, invoices) => all.concat(invoices), [])
			.sort((a, b) => {
				return new Date(b.invoicing_date) - new Date(a.invoicing_date);
			});
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