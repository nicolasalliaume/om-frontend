import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import InvoicesDisplayList from './InvoicesDisplayList';

export default function ExpensesInvoicesDisplayCard(props) {
	return (
		<Card className={`list outcome invoices-list display`}>
			<CardBody >
				<CardTitle><b>Expenses</b> invoices</CardTitle>
				<InvoicesDisplayList invoices={props.invoices} />
			</CardBody>
		</Card>
	)
}