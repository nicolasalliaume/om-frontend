import React, { Component } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody
} from 'reactstrap';
import HtmlDescription from './HtmlDescription';

export default class DescriptionModal extends Component {
	render() {
		const { description, title, toggle, show, className, isHTML } = this.props;
		const classes = (className || '') + (isHTML ? ' html' : '');
		return (
			<Modal isOpen={show} toggle={toggle} className={classes}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody className="description-modal-body">
					{ isHTML && <HtmlDescription description={description} /> }
					{ !isHTML && description }
				</ModalBody>
			</Modal>
		)
	}
}