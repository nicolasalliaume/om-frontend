import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import ProjectsBillingStatusList from '../components/billing/projects_status/ProjectsBillingStatusList';
import LatestInvoicesList from '../components/billing/invoices/LatestInvoicesList';
import UnpaidInvoicesCard from '../components/billing/invoices/UnpaidInvoicesCard';
import OverworkCard from '../components/billing/projects_status/OverworkCard';
import ProjectsBillingStatusCard from '../components/billing/projects_status/ProjectsBillingStatusCard';
import MonthlyInvoicesMissing from '../components/billing/invoices/MonthlyInvoicesMissing';
import BillingOpportunities from '../components/billing/opportunities/BillingOpportunities';
import CreateInvoiceFloatingButton from '../components/billing/misc/CreateInvoiceFloatingButton';
import { fetchProjectsListIfNeeded } from '../actions/projects';

import './../styles/Billing.css';

class Billing extends Component {
	componentWillMount() {
		this.props.fetchProjectsListIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsListIfNeeded();
	}
	getFilteredProjectId() {
		const { match, projectsById } = this.props;
		if (!projectsById || !match.params) return null;
		const { projectFilter } = match.params;
		if (!projectFilter) return null;

		const filter = projectFilter.replace(/-/g, ' ').toLowerCase();
		const matches = Object.values(projectsById)
			.filter(p => p.name.toLowerCase() === filter)
		if (matches.length === 0) return null;
		return matches[0]._id;
	}
	render() {
		return (
			<div className='billing'>
				<Row>
					<Col lg={4} xs={12}>
					<ProjectsBillingStatusCard project={this.getFilteredProjectId()} />
					</Col>
					<Col lg={4} xs={12}>
						<Card className='latest-invoices list list--large'>
							<CardBlock className='card-body'>
								<CardTitle>Latest <b>invoices</b></CardTitle>
							</CardBlock>
						</Card>
						<LatestInvoicesList filter={this.getFilteredProjectId()}/>
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

const mapStateToProps = state => { return {
	projectsById: state.cache.projects.projectsById
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsListIfNeeded : () => dispatch(fetchProjectsListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
