import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EditInvoiceModalForm from '../invoices/EditInvoiceModalForm';
import { getNewInvoiceTemplate } from './../../../utils';

export default class CreateInvoiceCta extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}

	toggle = () => this.setState({ modal : !this.state.modal });

	render() {
		const invoiceTemplate = getNewInvoiceTemplate(this.props);
		return (
			<React.Fragment>
				<Button onClick={this.toggle}>Create</Button>
				<EditInvoiceModalForm show={this.state.modal}
					toggle={this.toggle} invoice={invoiceTemplate} />
			</React.Fragment>
		)
	}
}