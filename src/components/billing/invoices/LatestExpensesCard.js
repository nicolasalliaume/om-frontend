import React from 'react';
import LatestInvoicesList from './LatestInvoicesList';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function LatestExpensesCard(props) {
	return (
		<div>
			<Card className='latest-invoices expenses list list--large'>
				<CardBlock className='card-body'>
					<CardTitle>Latest <b>expenses</b></CardTitle>
				</CardBlock>
			</Card>
			<LatestInvoicesList direction='in' />
		</div>
	)
}