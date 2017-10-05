import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
import { updateIntegration, createIntegration, deleteIntegration } from '../../../actions/integrations';
import { confirmAlert } from './../../misc/ConfirmDialog';
import Strings from '../../../strings/dialogs';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from 'reactstrap';
import EditIntegrationForm from './EditIntegrationForm';

class EditIntegrationModalForm extends Component {
	constructor() {
		super();
		this.state = { integration : null }
	}
	
	componentWillMount() {
		this.setState({ integration : this.props.integration });
	}
	
	submit = () => {
		const { integration } = this.state;

		if (this.props.edit) {
			this.props.updateIntegration(integration._id, integration);
		} else {
			this.props.createIntegration(integration);
		}

		this.props.toggle();
	}
	
	confirmDelete = () => {
		confirmAlert({
			title : 'Delete integration',
			message : Strings.DELETE_INTEGRATION,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.delete
		})
	}

	delete = () => {
		this.props.deleteIntegration(this.state.integration._id);
	}

	onFormChange = (integration) => {
		this.setState({ integration });
	}

	isDeletable = () => ['trello', 'teamwork'].includes(this.props.integration.service)

	render() {
		const { integration } = this.state;
		const { toggle, show } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className='integration-edit-modal'>
				<ModalHeader toggle={toggle}><b>{integration.name}</b></ModalHeader>
				<ModalBody>
					<EditIntegrationForm onChange={this.onFormChange} integration={integration} />
				</ModalBody>
				<ModalFooter>
					{ this.isDeletable() && 
						<Button color='danger' className='delete' onClick={this.confirmDelete}>Delete</Button>
					}
					<Button color="primary" onClick={this.submit}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Close</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    updateIntegration : (integrationId, update) => dispatch(updateIntegration(integrationId, update)),
    createIntegration : (integration) => dispatch(createIntegration(integration)),
    deleteIntegration : (integrationId) => dispatch(deleteIntegration(integrationId))
}}

export default connect(null, mapDispatchToProps)(EditIntegrationModalForm);
