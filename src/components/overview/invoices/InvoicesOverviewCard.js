import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import InvoicesOverviewActionableList from './InvoicesOverviewActionableList';

export default function BillingInvoicesDisplayCard(props) {
	return (
		<Card className={`list invoices-list display`}>
			<CardBody >
				<CardTitle><b>Invoices</b></CardTitle>
				<InvoicesOverviewActionableList invoices={props.invoices} />
			</CardBody>
		</Card>
	)
}