import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsListIfNeeded } from './../../../actions/projects';
import ProjectsAdminCardListItem from './ProjectsAdminCardListItem';

class ProjectsAdminCard extends Component {
	componentWillMount() {
		this.props.fetchProjectsListIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsListIfNeeded();	
	}
	getSortedProjects() {
		return Object.values(this.props.projectsCache.projectsById)
			.sort((a, b) => {
				if (a.active && !b.active) return -1;
				if (!a.active && b.active) return 1;
				return a.name > b.name ? 1 : -1;
			})
	}
	render() {
		return (
			<Card className='projects list'>
				<CardBody >
					<CardTitle>Projects</CardTitle>
					<ul>
						{ this.getSortedProjects().map(p => {
							return (
								<ProjectsAdminCardListItem key={p._id} project={p} />
							)
						}) }
					</ul>
				</CardBody>
			</Card>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsListIfNeeded : () => dispatch(fetchProjectsListIfNeeded())
}}

const mapStateToProps = state => { return {
	projectsCache: state.cache.projects
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsAdminCard);