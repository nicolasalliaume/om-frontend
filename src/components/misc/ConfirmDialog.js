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

export default class ConfirmDialog extends Component {

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: false,
    message: false,
    childrenElement: () => null,
    confirmLabel: false,
    cancelLabel: false,
    onConfirm: () => null,
    onCancel: () => null,
  };

  constructor() {
    super();
    this.state = { open : true };
  }

  onClickConfirm = () => {
    this.props.onConfirm();
    this.close()
  };

  onClickCancel = () => {
    this.props.onCancel();
    this.close()
  };

  close = () => {
    this.setState({ open : false })
    const target = document.getElementById('confirm-dialog');
    target.parentNode.removeChild(target);
  }

  render() {

    const {
      title,
      message,
      confirmLabel,
      cancelLabel,
      childrenElement,
    } = this.props;
    const { open } = this.state;

    return (
      <Modal isOpen={open} toggle={this.close}>
        <ModalHeader toggle={this.close}>{title}</ModalHeader>
        <ModalBody>
          {message && <p dangerouslySetInnerHTML={{__html: message}} />}
          {childrenElement}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onClickConfirm}>{confirmLabel}</Button>{' '}
          <Button color="secondary" onClick={this.onClickCancel}>{cancelLabel}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

function createElemetReconfirm(properties) {
  const divTarget = document.createElement('div');
  divTarget.id = 'confirm-dialog';
  document.body.appendChild(divTarget);
  render(<ConfirmDialog {...properties} />, divTarget);
}

export function confirmAlert(properties) {
  createElemetReconfirm(properties)
}