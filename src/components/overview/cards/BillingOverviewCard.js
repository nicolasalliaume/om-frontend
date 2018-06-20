import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

export default function BillingOverviewCard(props) {
	const { className, title, amount } = props;
	return (
		<Card className={className}>
			<CardBody >
				<CardTitle dangerouslySetInnerHTML={{__html: title}} />
				<div className='amount text-center money'>{amount}</div>
			</CardBody>
		</Card>
	)
}
