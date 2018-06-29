import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import EditIntegrationModalForm from './../forms/EditIntegrationModalForm';
import FloatingButton from './../../misc/FloatingButton';
import { getNewIntegrationTemplate } from './../../../utils';

export default class CreateIntegrationFloatingButton extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}

	toggle = () => this.setState({ modal : !this.state.modal });

	render() {
		return (
			<React.Fragment>
				<FloatingButton color='accent' onClick={this.toggle}>
					<Icon fa-plus />
				</FloatingButton>
				<EditIntegrationModalForm show={this.state.modal}
					toggle={this.toggle} integration={getNewIntegrationTemplate()} />
			</React.Fragment>
		)
	}
}