import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import EditBillingInvoiceModalForm from '../invoices/EditBillingInvoiceModalForm';
import FloatingButton from './../../misc/FloatingButton';
import { getNewInvoiceTemplate } from './../../../utils';

export default class CreateInvoiceFloatingButton extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}

	toggle = () => this.setState({ modal : !this.state.modal });

	render() {
		return (
			<FloatingButton color='accent' onClick={this.toggle}>
				<Icon fa-plus />
				<EditBillingInvoiceModalForm show={this.state.modal}
					toggle={this.toggle} invoice={getNewInvoiceTemplate()} />
			</FloatingButton>
		)
	}
}