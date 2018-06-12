import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/billing';
import ProjectsBillingStatusListItem from './ProjectsBillingStatusListItem';

class ProjectsBillingStatusList extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	render() {
		let { projectsById, filter } = this.props;
		const projects = Object.values(projectsById)
			.filter(filter ? p => p._id === filter : p => p.active)
			.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0))
		
		return (
			<ul className='projects-list'>
				{ projects && projects.map(project => {
					return <ProjectsBillingStatusListItem key={project._id} project={project} />
				})}
			</ul>
		)
	}
}

const mapStateToProps = (state, props) => { return {
	projectsById: state.billingView.projectsBilling.projectsById,
	...props
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBillingStatusList);