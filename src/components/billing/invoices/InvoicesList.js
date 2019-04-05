import React from 'react';
import InvoicesListItem from './InvoicesListItem';

export default function InvoicesList( props ) {
	const { invoices, sendEnabled } = props;
	return (
		<div className='list list--large invoices-list'>
			<ul>
				{ invoices.map( invoice => (
					<InvoicesListItem key={invoice._id} 
					  invoice={invoice} 
					  sendEnabled={sendEnabled} />
				) ) }
			</ul>
			{ props.onLoadMore && (
				<div className='list__footer'>
					<button 
						className='list__footer__load-more'
						onClick={ props.onLoadMore }
					>
						Load more
					</button>
				</div>
			) }
		</div>
	);
}