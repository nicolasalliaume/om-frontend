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
	setProjectDashboardVisibleProject,
	fetchWorkEntriesForProjectIfNeeded,
	setProjectDashboardWorkEntriesFilters,
	setProjectDashboardObjectivesFilter
} from '../actions/projects';
import { fetchProjectsBillingIfNeeded } from '../actions/billing';
import { 
	fetchActiveObjectivesForProject, 
	fetchObjectivesArchiveForProject
} from '../actions/objectives';

import './../styles/Billing.css';
import './../styles/ProjectDashboard.css';

class ProjectDashboard extends Component {
	componentWillMount() {
		this.fetch(this.props);
	}

	componentWillReceiveProps(props) {
		this.fetch(props);
	}

	fetch(props) {
		const projectId = this.getProjectId(props);
		props.setProjectDashboardVisibleProject(projectId);
		props.fetchProjectsBillingIfNeeded();
		props.fetchWorkEntriesForProjectIfNeeded(projectId);
		this.fetchObjectives(projectId, props);
	}

	// we're keeping the fetchActiveObjectivesForProject and
	// fetchObjectivesArchiveForProject in actions/objectives
	// independent of the component with this logic here
	fetchObjectives(projectId, props) {
		const { archived, active } = props.projectDashboardView.objectives;
		if (active.didInvalidate && !active.isFetching)
			props.fetchActiveObjectivesForProject(projectId, active.filters);
		if (archived.didInvalidate && !archived.isFetching)
			props.fetchObjectivesArchiveForProject(projectId, archived.filters);
	}

	getProjectId = (props) => {
		const { projectsById, match } = props;
		return getProjectIdFromEncodedName(match.params.projectName, projectsById);
	}

	render() {
		const projectId = this.getProjectId(this.props);
		if (!projectId) return <div>Project not found</div>;

		const { projectDashboardView, projectsBilling } = this.props;
		const { archived, active } = projectDashboardView.objectives;
		const { workEntries } = projectDashboardView;

		const project = projectsBilling.projectsById[projectId];

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
						<ProjectWorkEntriesCard 
						  project={project}
						  workEntries={workEntries}
						  onFiltersChange={this.handleWorkEntriesFilterChange.bind(this)} />
					</Col>
					<Col lg={4} xs={12}>
						<ObjectivesDisplayList
							objectives={active.list}
							onFiltersChange={this.handleObjectivesFilterChanged('active').bind(this)}
							title={'<b>Active</b> objectives'} />
						<ObjectivesDisplayList
							objectives={archived.list}
							onFiltersChange={this.handleObjectivesFilterChanged('archived').bind(this)}
							title={'Objectives <b>archive</b>'} />
					</Col>
				</Row>
			</div>
		)
	}

	handleWorkEntriesFilterChange(filters) {
		this.props.setProjectDashboardWorkEntriesFilters(filters);
	}

	handleObjectivesFilterChanged(collection) {
		return filters => {
			console.log(collection, filters);
			this.props.setProjectDashboardObjectivesFilter(collection, filters);
		}
	}
}

const mapStateToProps = state => { return {
	projectsById: state.cache.projects.projectsById,
	projectDashboardView: state.projectDashboardView,
	projectsBilling: state.billingView.projectsBilling,
}}

const mapDispatchToProps = dispatch => { return {
	setProjectDashboardVisibleProject : (projectId) => dispatch(setProjectDashboardVisibleProject(projectId)),
	fetchProjectsBillingIfNeeded : _ => dispatch(fetchProjectsBillingIfNeeded()),
	fetchActiveObjectivesForProject : (projectId, filters) => dispatch(fetchActiveObjectivesForProject(projectId, filters)),
	fetchObjectivesArchiveForProject : (projectId, filters) => dispatch(fetchObjectivesArchiveForProject(projectId, filters)),
	fetchWorkEntriesForProjectIfNeeded : (projectId) => dispatch(fetchWorkEntriesForProjectIfNeeded(projectId)),
	setProjectDashboardWorkEntriesFilters : (filters) => dispatch(setProjectDashboardWorkEntriesFilters(filters)),
	setProjectDashboardObjectivesFilter: (collection, filters) => dispatch(setProjectDashboardObjectivesFilter(collection, filters)),
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard)
