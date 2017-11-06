import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ProjectsBillingStatusCard from '../components/billing/projects_status/ProjectsBillingStatusCard'
import { getProjectIdFromEncodedName } from '../utils';
import { connect } from 'react-redux';
import BillingInvoicesDisplayCard from '../components/project_dashboard/BillingInvoicesDisplayCard';
import ExpensesInvoicesDisplayCard from '../components/project_dashboard/ExpensesInvoicesDisplayCard';
import ObjectivesDisplayList from '../components/project_dashboard/ObjectivesDisplayList';
import ProjectBalanceCard from '../components/project_dashboard/ProjectBalanceCard';
import ProjectWorkEntriesCard from '../components/project_dashboard/ProjectWorkEntriesCard';
import { 
	fetchProjectsListIfNeeded, 
	setProjectDashboardVisibleProject,
	fetchBillingForProject,
	fetchWorkEntriesForProject,
	setProjectDashboardWorkEntriesFilters
} from '../actions/projects';
import { 
	fetchActiveObjectivesForProject, 
	fetchObjectivesArchiveForProject
} from '../actions/objectives';

import './../styles/Billing.css';
import './../styles/ProjectDashboard.css';

class ProjectDashboard extends Component {
	componentWillMount() {
		const projectId = this.getProjectId(this.props);

		console.log(projectId);

		this.props.setProjectDashboardVisibleProject(projectId);
		this.props.fetchBillingForProject(projectId);
		this.props.fetchWorkEntriesForProject(projectId);
	}

	componentWillReceiveProps(props) {
		const { isFetching, didInvalidate } = props.projectDashboard.workEntries;
		if (didInvalidate && !isFetching) {
			this.props.fetchWorkEntriesForProject(this.getProjectId(props));
		}
	}

	getProjectId = (props) => {
		const { projectsById, match } = props;
		return getProjectIdFromEncodedName(match.params.projectName, projectsById);
	}

	render() {
		const projectId = this.getProjectId(this.props);
		if (!projectId) return <div>Project not found</div>;

		const { projectDashboard } = this.props;
		const { archived, active } = projectDashboard.objectives;
		const { workEntries } = projectDashboard;

		const project = projectDashboard.billing.project;

		const invoices = (project || {}).invoices || [];
		const billingInvoices = invoices.filter(i => i.direction === 'out');
		const expensesInvoices = invoices.filter(i => i.direction === 'in');
		// sorting
		billingInvoices.sort((a, b) => new Date(b.invoicing_date) - new Date(a.invoicing_date));
		expensesInvoices.sort((a, b) => new Date(b.invoicing_date) - new Date(a.invoicing_date));

		return (
			<div className='project-dashboard'>
				<Row>
					<Col lg={4} xs={12}>
						<ProjectsBillingStatusCard project={projectId}
							title={'Project <b>status</b>'} />
						<ProjectBalanceCard project={project} />
						<BillingInvoicesDisplayCard invoices={billingInvoices} />
						<ExpensesInvoicesDisplayCard invoices={expensesInvoices} />
					</Col>
					<Col lg={4} xs={12}>
						<ProjectWorkEntriesCard project={projectId} workEntries={workEntries}
							applyWorkEntryFilters={this.props.applyWorkEntryFilters} />
					</Col>
					<Col lg={4} xs={12}>
						<ObjectivesDisplayList
							fetch={filters => this.props.fetchActiveObjectivesForProject(projectId, filters)}
							dataSource={active.list}
							title={'<b>Active</b> objectives'} />
						<ObjectivesDisplayList
							fetch={filters => this.props.fetchObjectivesArchiveForProject(projectId, filters)}
							dataSource={archived.list}
							title={'Objectives <b>archive</b>'} />
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => { return {
	projectsById: state.cache.projects.projectsById,
	projectDashboard: state.projectDashboardView
}}

const mapDispatchToProps = dispatch => { return {
	setProjectDashboardVisibleProject : (projectId) => dispatch(setProjectDashboardVisibleProject(projectId)),
	fetchBillingForProject : (projectId) => dispatch(fetchBillingForProject(projectId)),
	fetchActiveObjectivesForProject : (projectId, filters) => dispatch(fetchActiveObjectivesForProject(projectId, filters)),
	fetchObjectivesArchiveForProject : (projectId, filters) => dispatch(fetchObjectivesArchiveForProject(projectId, filters)),
	fetchWorkEntriesForProject : (projectId) => dispatch(fetchWorkEntriesForProject(projectId)),
	applyWorkEntryFilters : (filters) => dispatch(setProjectDashboardWorkEntriesFilters(filters))
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard)
