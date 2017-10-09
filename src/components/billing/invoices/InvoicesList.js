import React from 'react';
import InvoicesListItem from './InvoicesListItem';

export default function InvoicesList(props) {
	const { invoices } = props;
	return (
		<div className='list invoices-list'>
			<ul>
				{ invoices.map((invoice, idx) => {
					return <InvoicesListItem key={idx} invoice={invoice} />
				})}
			</ul>
		</div>
	)
}