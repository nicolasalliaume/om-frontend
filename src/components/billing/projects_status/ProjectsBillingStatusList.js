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
		let { projects, filter } = this.props;
		projects = projects.filter(filter ? p => p._id === filter : p => p.active);
		
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
	projects: state.billingView.projectsBilling.projects || [],
	...props
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBillingStatusList);