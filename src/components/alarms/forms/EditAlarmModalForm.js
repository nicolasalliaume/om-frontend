import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { confirmAlert } from './../../misc/ConfirmDialog';
import Strings from '../../../strings/dialogs';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from 'reactstrap';
import { createAlarm, updateAlarm, deleteAlarm } from '../../../actions/alarms';
import EditAlarmForm from './EditAlarmForm';

class EditAlarmModalForm extends Component {
	constructor() {
		super();
		this.state = { alarm : null }
	}
	
	componentWillMount() {
		this.setState({ alarm : this.props.alarm });
	}
	
	submit = () => {
		const { alarm } = this.state;

		if (this.props.edit) {
			this.props.updateAlarm(alarm._id, alarm);
		} else {
			this.props.createAlarm(alarm);
		}

		this.props.toggle();
	}
	
	confirmDelete = () => {
		confirmAlert({
			title : 'Delete alarm',
			message : Strings.DELETE_ALARM,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.delete
		})
	}

	delete = () => {
		this.props.deleteAlarm(this.state.alarm._id);
	}

	onFormChange = (alarm) => {
		this.setState({ alarm });
	}

	render() {
		const { alarm } = this.state;
		const { toggle, show } = this.props;
		return (
			<Modal isOpen={show} toggle={toggle} className='alarm-edit-modal'>
				<ModalHeader toggle={toggle}><b>{alarm.name}</b></ModalHeader>
				<ModalBody>
					<EditAlarmForm onChange={this.onFormChange} alarm={alarm} />
				</ModalBody>
				<ModalFooter>
					<Button color='danger' className='delete' onClick={this.confirmDelete}>Delete</Button>
					<Button color="primary" onClick={this.submit}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Close</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    updateAlarm : (alarmId, update) => dispatch(updateAlarm(alarmId, update)),
    createAlarm : (alarm) => dispatch(createAlarm(alarm)),
    deleteAlarm : (alarmId) => dispatch(deleteAlarm(alarmId))
}}

export default connect(null, mapDispatchToProps)(EditAlarmModalForm);
