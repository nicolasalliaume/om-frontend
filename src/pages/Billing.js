import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import ProjectsBillingStatusList from '../components/billing/projects_status/ProjectsBillingStatusList';
import LatestInvoicesList from '../components/billing/invoices/LatestInvoicesList';

import './../styles/Billing.css';

export default class Tasks extends Component {
	render() {
		return (
			<div className='billing'>
				<Row>
					<Col lg={4} xs={12}>
						<Card className='projects-status list list--large'>
							<CardBlock className='card-body'>
								<CardTitle>Projects <b>status</b></CardTitle>
								<ProjectsBillingStatusList />
							</CardBlock>
						</Card>
					</Col>
					<Col lg={6} xs={12}>
						<Card className='latest-invoices list list--large'>
							<CardBlock className='card-body'>
								<CardTitle>Latest <b>invoices</b></CardTitle>
							</CardBlock>
						</Card>
						<LatestInvoicesList />
					</Col>
					<Col lg={2} xs={12}>
						Stuff
					</Col>
				</Row>
			</div>
		)
	}
}