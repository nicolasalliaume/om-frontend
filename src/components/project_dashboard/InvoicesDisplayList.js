import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Icon from '../misc/Icon';
import moment from 'moment';

export default class InvoicesDisplayList extends Component {
	render() {
		const { invoices } = this.props;
		if (invoices.empty()) 
			return <p className='text-center'>No invoices to show</p>;

		return (
			<ul className={`invoices-list`}>
				{ invoices.map((i) => this.renderInvoice(i)) }
			</ul>
		)
	}

	renderInvoice(invoice) {
		const { _id, description, paid, billed_hours, amount, invoicing_date } = invoice;
		const date = moment.utc(invoicing_date).format('MM/DD');
		const className = paid ? 'paid' : 'unpaid';
		return (
			<li key={_id} className={`invoice display row ${className}`}>
				<Col xs={12}>
					<p>{description}</p>
				</Col>
				<Col xs={12}>
					<footer className='row'>
						<Col xs={4} className='date'><Icon fa-calendar-o />{date}</Col>
						<Col xs={4} className='hours'><Icon fa-clock-o />{billed_hours} Hrs</Col>
						<Col xs={4} className='amount'><Icon fa-dollar />{amount}</Col>
					</footer>
				</Col>
			</li>
		)
	}
}