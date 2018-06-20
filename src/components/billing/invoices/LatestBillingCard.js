import React from 'react';
import LatestInvoicesList from './LatestInvoicesList';
import { Card, CardBody, CardTitle } from 'reactstrap';

export default function LatestBillingCard(props) {
	return (
		<div>
			<Card className='latest-invoices income list list--large'>
				<CardBody >
					<CardTitle>Latest <b>billing</b></CardTitle>
				</CardBody>
			</Card>
			<LatestInvoicesList direction='out' />
		</div>
	)
}