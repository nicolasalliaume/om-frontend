import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import FloatingButtonWithOptions from './../../misc/FloatingButtonWithOptions';
import EditUserModalForm from '../../users/forms/EditUserModalForm';
import EditProjectModalForm from '../../projects/forms/EditProjectModalForm';
import { getNewUserTemplate } from '../../../utils';

export default class AdminAddFloatingButton extends Component {
	constructor() {
		super();
		this.state = { 
			newUserModal: false, 
			newProjectModal: false,
			open: false
		};
	}
	
	toggleButton = () => this.toggle('open')
	toggleUser = () => this.toggle('newUserModal')
	toggleProject = () => this.toggle('newProjectModal')
	toggle = (prop) => this.setState({ [prop] : !this.state[prop] })

	render() {
		const options = {
			'User': this.toggleUser,
			'Project': this.toggleProject
		};
		return (
			<FloatingButtonWithOptions id='floating-btn'
					color='accent' options={options} 
					open={this.state.open} toggle={this.toggleButton}>
				<Icon fa-plus />
				
				<EditUserModalForm user={getNewUserTemplate()} 
					show={this.state.newUserModal} 
					toggle={this.toggleUser} />
				<EditProjectModalForm project={{}} 
					show={this.state.newProjectModal} 
					toggle={this.toggleProject} />
			</FloatingButtonWithOptions>
		)
	}
}