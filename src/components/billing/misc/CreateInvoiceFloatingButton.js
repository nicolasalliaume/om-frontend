import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import EditInvoiceModalForm from '../invoices/EditInvoiceModalForm';
import FloatingButtonWithOptions from './../../misc/FloatingButtonWithOptions';
import { getNewInvoiceTemplate } from './../../../utils';

export default class CreateInvoiceFloatingButton extends Component {
	constructor() {
		super();
		this.state = { 
			billingModal : false,
			expensesModal : false,
			open : false
		};
	}

	toggleButton = () => this.toggle('open')
	toggleBillingInvoiceModal = () => this.toggle('billingModal')
	toggleExpensesInvoiceModal = () => this.toggle('expensesModal')
	toggle = modal => this.setState({ [modal] : !this.state[modal] })

	render() {
		const options = {
			'Billing invoice': this.toggleBillingInvoiceModal,
			'Expenses invoice': this.toggleExpensesInvoiceModal
		}
		return (
			<FloatingButtonWithOptions color='accent' toggle={this.toggleButton} 
				options={options} open={this.state.open}>
				<Icon fa-plus />

				<EditInvoiceModalForm show={this.state.billingModal}
					toggle={this.toggleBillingInvoiceModal} invoice={getNewInvoiceTemplate('out')} />
				<EditInvoiceModalForm show={this.state.expensesModal}
					toggle={this.toggleExpensesInvoiceModal} invoice={getNewInvoiceTemplate('in', true)} />
			</FloatingButtonWithOptions>
		)
	}
}