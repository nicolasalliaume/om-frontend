import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import InvoicesOverviewDisplayList from './InvoicesOverviewDisplayList';

export default function BillingInvoicesDisplayCard(props) {
	return (
		<Card className={`list invoices-list display`}>
			<CardBlock className='card-body'>
				<CardTitle><b>Invoices</b></CardTitle>
				<InvoicesOverviewDisplayList invoices={props.invoices} />
			</CardBlock>
		</Card>
	)
}