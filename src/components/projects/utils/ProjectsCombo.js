import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchProjectsListIfNeeded } from './../../../actions/projects';

class ProjectsCombo extends Component {
	constructor() {
		super();
		this.state = { selected: null }
	}
	selectProject = (selected) => { 
		this.setState({ selected })
		this.props.onChange(selected);
	}
	render() {
		const { projectsCache } = this.props;
		let projects = [];

		if (projectsCache !== undefined) {
			const { projectsById } = projectsCache;
			projects = Object.values(projectsById);
		}

		const disabled = projects.length === 0;
		
		return (
			<Input type="select" name="projects-list" id="projects-list" 
					value={this.state.selected} disabled={disabled}
					onChange={this.selectProject} placeholder=".....loading....">
				{ projects.map(u => 
					<option key={u._id} value={u._id}>{u.full_name}</option>
				)}
				{ disabled && <option value={null}>Loading...</option> }
			</Input>
		)
	}
}

const mapStateToProps = state => { return {
	projectsById : state.cache.projects.projectsById
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsListIfNeeded : () => dispatch(fetchProjectsListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsCombo);