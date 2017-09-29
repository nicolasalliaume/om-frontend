import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityCombo from '../../misc/EntityCombo';
import { fetchProjectsListIfNeeded } from './../../../actions/projects';

class ProjectsCombo extends Component {
	getProjectOptions = (projectsById) => {
		return Object.values(projectsById).map(p => {
			return {label: p.name, value: p._id}
		})
	}

	render() {
		return (
			<EntityCombo async 
				items={this.getProjectOptions(this.props.projectsById)} 
				fetchItems={this.props.fetchProjectsListIfNeeded} 
				{...this.props} /> 
			)
	}
}

const mapStateToProps = state => { return {
	projectsById : state.cache && state.cache.projects ? state.cache.projects.projectsById : {}
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsListIfNeeded : () => dispatch(fetchProjectsListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCombo);