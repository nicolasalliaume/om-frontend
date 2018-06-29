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
			<React.Fragment>
				<FloatingButton color='accent' onClick={this.toggle}>
					<Icon fa-plus />
				</FloatingButton>
				<EditObjectiveModalForm show={this.state.modal}
					toggle={this.toggle} objective={getNewObjectiveTemplate('day')} />
			</React.Fragment>
		)
	}
}