import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import ProjectsBillingStatusCard from '../components/billing/projects_status/ProjectsBillingStatusCard'
import { getProjectIdFromEncodedName } from '../utils';
import { connect } from 'react-redux';
import ObjectivesDisplayList from '../components/objectives/lists/ObjectivesDisplayList';
import { 
	fetchProjectsListIfNeeded, 
	setProjectDashboardVisibleProject
} from '../actions/projects';
import { 
	fetchActiveObjectivesForProject, 
	fetchObjectivesArchiveForProject
} from '../actions/objectives';

import './../styles/ProjectDashboard.css';

class ProjectDashboard extends Component {
	componentWillMount() {
		const projectId = this.getProjectId(this.props);
		this.props.setProjectDashboardVisibleProject(projectId);
	}

	setupDashboard(props) {
		const { archived, active } = props.projectDashboard.objectives;
		const projectId = this.getProjectId(props);

		if (archived.didInvalidate && !archived.isFetching) {
			props.fetchObjectivesArchiveForProject(projectId);
		}
		if (active.didInvalidate && !active.isFetching) {
			props.fetchActiveObjectivesForProject(projectId);
		}
	}

	getProjectId = (props) => {
		const { projectsById, match } = props;
		return getProjectIdFromEncodedName(match.params.projectName, projectsById);
	}

	render() {
		const projectId = this.getProjectId(this.props);
		if (!projectId) return <div>Project not found</div>;

		const { archived, active } = this.props.projectDashboard.objectives;

		return (
			<div className='project-dashboard'>
				<Row>
					<Col lg={4} xs={12}>
						<ProjectsBillingStatusCard project={projectId}
							title={'Project <b>status</b>'} />
					</Col>
					<Col lg={4} xs={12}>
						<ObjectivesDisplayList
							fetch={filters => this.props.fetchActiveObjectivesForProject(projectId, filters)}
							dataSource={active.list}
							title={'<b>Active</b> objectives'} />
					</Col>
					<Col lg={4} xs={12}>
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
	fetchActiveObjectivesForProject : (projectId, filters) => dispatch(fetchActiveObjectivesForProject(projectId, filters)),
	fetchObjectivesArchiveForProject : (projectId, filters) => dispatch(fetchObjectivesArchiveForProject(projectId, filters))
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard)
