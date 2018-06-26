import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import EditInvoiceModalForm from '../../billing/invoices/EditInvoiceModalForm';

export default class SendInvoiceCard extends Component {
	constructor() {
		super();
		this.state = { modal: false }
	}
	render() {
		const { amount, invoice } = this.props;
		return (
			<React.Fragment>
				<Card className='send-invoice-card'>
					<CardBody className='text-center'>
						{ amount === 0 && 
							<p>You have no hours to bill at this point.</p>
						}
						{ amount > 0 && 
							<React.Fragment>
								<p>You have <b>{ amount } hrs</b> that you can bill today.</p>
								<Button onClick={this.showModal.bind(this)}>Send invoice</Button>
							</React.Fragment>
						}
					</CardBody>
				</Card>
				<EditInvoiceModalForm
				  fields={['description', 'amount', 'invoicing_date', 'billed_hours', 'attachment']} 
				  show={this.state.modal}
				  toggle={this.toggle} 
				  invoice={invoice} />
			</React.Fragment>
		)
	}

	showModal() {
		this.setState({ modal: true })
	}

	toggle = _ => this.setState({ modal: !this.state.modal })
}