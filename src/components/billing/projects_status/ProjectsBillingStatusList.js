import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';
import ProjectsBillingStatusListItem from './ProjectsBillingStatusListItem';

class ProjectsBillingStatusList extends Component {
	componentDidMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	render() {
		const { projects } = this.props;
		return (
			<ul className='projects-list'>
				{ projects.map(project => {
					return <ProjectsBillingStatusListItem key={project._id} project={project} />
				})}
			</ul>
		)
	}
}

const mapStateToProps = state => { return {
	projects : state.billingView.projectsBilling.projects
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBillingStatusList);