import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';
import ViewObjectiveModalForm from '../components/objectives/forms/ViewObjectiveModalForm';
import EditInvoiceModalForm from '../components/billing/invoices/EditInvoiceModalForm';
import OverlayedObjectiveModal from '../components/objectives/forms/ViewObjectiveModalForm';
import { syncFetchInvoiceWithId } from '../actions/billing'

export default class ModalContainer extends Component {
	render() {
		return (
			<div>
				<Route path='*/objective/:oid' component={withRouter(ObjectiveModalContainer)} />
				<Route path='*/invoice/:iid' component={withRouter(InvoiceModalContainer)} />
			</div>
		)
	}
}

function ObjectiveModalContainer(props) {
	const close = _ => {
		props.history.push(props.location.pathname.replace(/\/objective\/[a-zA-Z0-9]+/, ''));
	}
	return (
		<OverlayedObjectiveModal 
			show={true}
			objectiveId={props.match.params.oid}
			toggle={close} />
	)
}

const InvoiceModalContainer = connect()(class extends Component {
	constructor(props) {
		super(props);
		this.state = { invoice: null };
		const _this = this;
		this.props.dispatch(syncFetchInvoiceWithId(props.match.params.iid, function(invoice) {
			if (invoice) _this.setState({ invoice })
		}))
	}
	
	close = _ => {
		this.props.history.push(this.props.location.pathname.replace(/\/invoice\/[a-zA-Z0-9]+/, ''));
	}
	
	render() {
		if (!this.state.invoice) return <span/>
		return (
			<EditInvoiceModalForm edit
				show={true}
				invoice={this.state.invoice}
				toggle={this.close} />
		)
	}
})

