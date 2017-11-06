import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import InvoicesDisplayList from './InvoicesDisplayList';

export default function ExpensesInvoicesDisplayCard(props) {
	return (
		<Card className={`list outcome invoices-list display`}>
			<CardBlock className='card-body'>
				<CardTitle><b>Expenses</b> invoices</CardTitle>
				<InvoicesDisplayList invoices={props.invoices} />
			</CardBlock>
		</Card>
	)
}