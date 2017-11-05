import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import ProjectsBillingStatusList from '../components/billing/projects_status/ProjectsBillingStatusList';
import UnpaidInvoicesCard from '../components/billing/invoices/UnpaidInvoicesCard';
import OverworkCard from '../components/billing/projects_status/OverworkCard';
import ProjectsBillingStatusCard from '../components/billing/projects_status/ProjectsBillingStatusCard';
import MonthlyInvoicesMissing from '../components/billing/invoices/MonthlyInvoicesMissing';
import BillingOpportunities from '../components/billing/opportunities/BillingOpportunities';
import CreateInvoiceFloatingButton from '../components/billing/misc/CreateInvoiceFloatingButton';
import { fetchProjectsListIfNeeded } from '../actions/projects';
import LatestBillingCard from '../components/billing/invoices/LatestBillingCard';

import './../styles/Billing.css';

export default class Billing extends Component {
	render() {
		return (
			<div className='billing'>
				<Row>
					<Col lg={4} xs={12}>
					<ProjectsBillingStatusCard />
					</Col>
					<Col lg={4} xs={12}>
						<LatestBillingCard />
					</Col>
					<Col lg={4}>
						<Row>
							<Col lg={6}>
								<UnpaidInvoicesCard />
							</Col>
							<Col lg={6}>
								<OverworkCard />
							</Col>
							<Col lg={12}>
								<MonthlyInvoicesMissing />
							</Col>
							<Col lg={12}>
								<BillingOpportunities />
							</Col>
						</Row>
					</Col>
				</Row>
				<CreateInvoiceFloatingButton />
			</div>
		)
	}
}