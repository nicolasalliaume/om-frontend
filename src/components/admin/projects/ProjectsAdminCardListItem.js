import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import AdminListItem from '../list/AdminListItem';
import { updateProject } from '../../../actions/projects';
import EditProjectModalForm from '../../projects/forms/EditProjectModalForm';

class ProjectsAdminCardListItem extends Component {
	constructor() {
		super();
		this.state = { editModal: false }
	}

	onEdit = () => this.toggleEditModal();

	onToggleActive = () => {
		const { project } = this.props;
		const updatedProject = update(project, {active: {$set: !project.active}});
		this.props.updateProject(updatedProject._id, updatedProject);
	}
	
	toggleEditModal = () => this.setState({ editModal: !this.state.editModal })
	
	render() {
		const { project } = this.props;
		const item = { label: project.name }
		return (
			<div>
				<AdminListItem 
					item={item} 
					className={project.active ? '' : 'inactive line-through'}
					options={['edit', 'enable']}
					onEdit={this.onEdit} 
					onEnable={this.onToggleActive}
					enabled={project.active}
				/>
				<EditProjectModalForm edit project={project} 
					show={this.state.editModal} 
					toggle={this.toggleEditModal} />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => { return {
	updateProject : (pid, update) => dispatch(updateProject(pid, update))
}}

export default connect(null, mapDispatchToProps)(ProjectsAdminCardListItem);