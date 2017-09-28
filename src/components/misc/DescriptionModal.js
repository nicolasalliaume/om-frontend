import React, { Component } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody
} from 'reactstrap';

export default class DescriptionModal extends Component {
	render() {
		const { description, title, toggle, show, className } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					{description}
				</ModalBody>
			</Modal>
		)
	}
}