import React, { Component } from 'react';
import { 
	Modal, 
	ModalHeader, 
	ModalBody
} from 'reactstrap';

export default class IntegrationInstructionsModal extends Component {
	render() {
		const { integration, show, toggle } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className='integration-instructions-modal'>
				<ModalHeader toggle={toggle}>Setting up <b>{integration.name}</b></ModalHeader>
				<ModalBody>
					{this.props.children}
				</ModalBody>
			</Modal>
		)
	}
}