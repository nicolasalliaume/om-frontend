import React from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';

export default function BillingOverviewCard(props) {
	const { className, title, amount } = props;
	return (
		<Card className={className}>
			<CardBlock className='card-body'>
				<CardTitle dangerouslySetInnerHTML={{__html: title}} />
				<div className='amount text-center money'>{amount}</div>
			</CardBlock>
		</Card>
	)
}
