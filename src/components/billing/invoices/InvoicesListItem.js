import React, { Component } from 'react';
import { Col, Card, CardBlock } from 'reactstrap';
import moment from 'moment';
import Icon from '../../misc/Icon';

export default class InvoicesListItem extends Component {
	render() {
		const { invoice } = this.props;
		const { paid, project, billed_hours, amount, invoicing_date } = invoice;
		const date = moment.utc(invoicing_date).format('MM/DD');
		const className = paid ? 'paid' : 'unpaid';
		return (
			<li className={`invoices-list-item ${className}`}>
				<Card>
					<CardBlock className='card-body row'>
						<Col xs={12}>
							<h4>{project.name}</h4>
							<p>{invoice.description}</p>
						</Col>
						<Col xs={12}>
							<footer className='row'>
								<Col xs={4} className='date'><Icon fa-calendar-o />{date}</Col>
								<Col xs={4} className='hours'><Icon fa-clock-o />{billed_hours} Hrs</Col>
								<Col xs={4} className='money'><Icon fa-dollar />{amount}</Col>
							</footer>
						</Col>
					</CardBlock>
				</Card>
			</li>
		)
	}
}