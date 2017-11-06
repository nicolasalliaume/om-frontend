import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import InvoicesDisplayList from './InvoicesDisplayList';

export default function BillingInvoicesDisplayCard(props) {
	return (
		<Card className={`list income invoices-list display`}>
			<CardBlock className='card-body'>
				<CardTitle><b>Billing</b> invoices</CardTitle>
				<InvoicesDisplayList invoices={props.invoices} />
			</CardBlock>
		</Card>
	)
}