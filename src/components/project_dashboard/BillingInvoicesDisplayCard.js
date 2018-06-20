import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import InvoicesDisplayList from './InvoicesDisplayList';

export default function BillingInvoicesDisplayCard(props) {
	return (
		<Card className={`list income invoices-list display`}>
			<CardBody >
				<CardTitle><b>Billing</b> invoices</CardTitle>
				<InvoicesDisplayList invoices={props.invoices} />
			</CardBody>
		</Card>
	)
}