import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';

export default function SendInvoiceCard(props) {
	return (
		<Card className='send-invoice-card'>
			<CardBody className='text-center'>
				{ props.amount === 0 && 
					<p>You have no hours to bill at this point.</p>
				}
				{ props.amount > 0 && 
					<React.Fragment>
						<p>You have <b>{ props.amount } hrs</b> that you can bill today.</p>
						<Button onClick={props.onSend}>Send invoice</Button>
					</React.Fragment>
				}
			</CardBody>
		</Card>
	)
}