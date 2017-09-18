import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';
import FloatingButton from './../../misc/FloatingButton';
import { getNewObjectiveTemplate } from './../../../utils';

export default class CreateObjectiveFloatingButton extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}

	toggle = () => this.setState({ modal : !this.state.modal });

	render() {
		return (
			<FloatingButton color='accent' onClick={this.toggle}>
				<Icon fa-plus />
				<EditObjectiveModalForm show={this.state.modal}
					toggle={this.toggle} objective={getNewObjectiveTemplate('day')} />
			</FloatingButton>
		)
	}
}