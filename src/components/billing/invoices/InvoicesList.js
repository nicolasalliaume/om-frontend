import React from 'react';
import InvoicesListItem from './InvoicesListItem';

export default function InvoicesList(props) {
	const { invoices } = props;
	return (
		<div className='list list--large invoices-list'>
			<ul>
				{ invoices.map((invoice, idx) => {
					return <InvoicesListItem key={invoice._id} invoice={invoice} />
				})}
			</ul>
		</div>
	)
}