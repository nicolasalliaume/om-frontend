import React, { Component } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody
} from 'reactstrap';

export default class DescriptionModal extends Component {
	render() {
		const { description, title, toggle, show } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					<p dangerouslySetInnerHTML={{__html: description}} />
				</ModalBody>
			</Modal>
		)
	}
}