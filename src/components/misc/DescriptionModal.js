import React, { Component } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody
} from 'reactstrap';

export default class DescriptionModal extends Component {
	getDescriptionHTML = () => {
		const { description } = this.props;
		return (
			<div className='task-email-body' dangerouslySetInnerHTML={{__html: description}}></div>
		);
	}
	render() {
		const { description, title, toggle, show, className, isHTML } = this.props;
		const classes = (className || '') + (isHTML ? ' html' : '');
		return (
			<Modal isOpen={show} toggle={toggle} className={classes}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					{ isHTML && this.getDescriptionHTML() }
					{ !isHTML && description}
				</ModalBody>
			</Modal>
		)
	}
}