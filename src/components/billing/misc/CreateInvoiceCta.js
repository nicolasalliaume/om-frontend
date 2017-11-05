import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EditBillingInvoiceModalForm from '../invoices/EditBillingInvoiceModalForm';
import { getNewInvoiceTemplate } from './../../../utils';

export default class CreateInvoiceCta extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}

	toggle = () => this.setState({ modal : !this.state.modal });

	render() {
		const invoiceTemplate = Object.assign(getNewInvoiceTemplate(), 
			this.props);
		return (
			<Button onClick={this.toggle}>
				Create
				<EditBillingInvoiceModalForm show={this.state.modal}
					toggle={this.toggle} invoice={invoiceTemplate} />
			</Button>
		)
	}
}