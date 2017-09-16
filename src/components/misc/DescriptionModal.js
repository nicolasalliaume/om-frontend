import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { 
  Row, 
  Col, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
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