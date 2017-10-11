import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityCombo from '../../misc/EntityCombo';
import { fetchProjectsListIfNeeded } from './../../../actions/projects';

class ProjectsCombo extends Component {
	getProjectOptions = (projectsById) => {
		return Object.values(projectsById)
			.filter(p => p.active)
			.map(p => { return {label: p.name, value: p._id} })
	}

	render() {
		return (
			<EntityCombo async 
				items={this.getProjectOptions(this.props.projectsCache.projectsById)} 
				fetchItems={this.props.fetchProjectsListIfNeeded} 
				{...this.props} /> 
			)
	}
}

const mapStateToProps = state => { return {
	projectsCache : state.cache.projects
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsListIfNeeded : () => dispatch(fetchProjectsListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCombo);