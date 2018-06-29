import React, { Component } from 'react';
import Icon from './../../misc/Icon';
import EditAlarmModalForm from './../forms/EditAlarmModalForm';
import FloatingButton from './../../misc/FloatingButton';
import { getNewAlarmTemplate } from './../../../utils';

export default class CreateAlarmFloatingButton extends Component {
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
				<EditAlarmModalForm show={this.state.modal}
					toggle={this.toggle} alarm={getNewAlarmTemplate()} />
			</React.Fragment>
		)
	}
}