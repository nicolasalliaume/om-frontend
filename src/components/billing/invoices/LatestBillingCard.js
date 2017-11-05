import React from 'react';
import LatestInvoicesList from './LatestInvoicesList';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function LatestBillingCard(props) {
	return (
		<div>
			<Card className='latest-invoices list list--large'>
				<CardBlock className='card-body'>
					<CardTitle>Latest <b>billing</b></CardTitle>
				</CardBlock>
			</Card>
			<LatestInvoicesList />
		</div>
	)
}