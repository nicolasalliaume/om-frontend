import React, { Component } from 'react';
import { connect } from 'react-redux';	
import update from 'immutability-helper';
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
		console.log('TODO: update integration');
		this.props.toggle();
	}
	onFormChange = (integration) => {
		this.setState({ integration });
	}
	render() {
		const { integration } = this.state;
		const { toggle, show } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}><b>{integration.name}</b></ModalHeader>
				<ModalBody>
					<EditIntegrationForm onChange={this.onFormChange} integration={integration} />
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submit}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Close</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    // updateTask : (taskId, update) => dispatch(updateTask(taskId, update))
}}

export default connect(null, mapDispatchToProps)(EditIntegrationModalForm);
