import React from 'react';
import LatestInvoicesList from './LatestInvoicesList';
import { Card, CardBody, CardTitle } from 'reactstrap';

export default function LatestExpensesCard(props) {
	return (
		<div>
			<Card className='latest-invoices expenses list list--large'>
				<CardBody >
					<CardTitle>Latest <b>expenses</b></CardTitle>
				</CardBody>
			</Card>
			<LatestInvoicesList direction='in' />
		</div>
	)
}