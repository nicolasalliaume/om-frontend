import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';

class UnpaidInvoicesCard extends Component {
	componentDidMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	getUnpaidInvoices() {
		return this.props.projects
			.map(p => p.invoices)
			.reduce((all, is) => all.concat(is), [])
			.filter(i => !i.paid);
	}
	render() {
		const invoices = this.getUnpaidInvoices();
		const count = invoices.length;
		const toBe = count === 1 ? 'is' : 'are';
		const singular_plural = 'invoice' + (count === 1 ? '' : 's');
		return (
			<Card className='unpaid spaced'>
				<CardBlock className='card-body text-center'>
					<CardTitle><b>Unpaid</b></CardTitle>
					{ count === 0 && <p>There are no unpaid invoices</p> }
					{ count > 0 && <p>There {toBe} <b>{count}</b> unpaid {singular_plural}</p> }
				</CardBlock>
			</Card>
		)
	}
}

const mapStateToProps = state => { return {
	projects: state.billingView.projectsBilling.projects
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidInvoicesCard);