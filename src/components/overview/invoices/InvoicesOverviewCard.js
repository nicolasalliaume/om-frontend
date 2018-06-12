import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import InvoicesOverviewActionableList from './InvoicesOverviewActionableList';

export default function BillingInvoicesDisplayCard(props) {
	return (
		<Card className={`list invoices-list display`}>
			<CardBlock className='card-body'>
				<CardTitle><b>Invoices</b></CardTitle>
				<InvoicesOverviewActionableList invoices={props.invoices} />
			</CardBlock>
		</Card>
	)
}