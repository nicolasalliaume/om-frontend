import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from 'reactstrap';
import EditObjectiveForm from './EditObjectiveForm';
import { 
	createObjective, 
	updateObjective 
} from './../../../actions/objectives';
import update from 'immutability-helper';
import moment from 'moment';

class EditObjectiveModalForm extends Component {
	constructor() {
		super();
		this.form = null;
		this.state = { 
			objective : null
		}
	}
	componentWillMount() {
		const { objective } = this.props;
		if (objective !== undefined) {
			const formattedDate = moment.utc(objective.objective_date).format('YYYY-MM-DD');
			this.setState({ objective : update(objective, {
				objective_date : {$set: formattedDate}
			}) });
		}
	}
	submitObjective = () => {
		if (!this.form.validate()) return;

		const { edit, createObjective, updateObjective } = this.props;
		const { objective } = this.state;
		const isNew = !edit;
		
		if (isNew) createObjective(objective);
		else updateObjective(objective._id, objective);

		this.props.toggle();
	}
	onFormChange = (newState) => {
		this.setState({objective : newState.objective});
	}
	render() {
		const { objective } = this.state;
		const { edit, toggle } = this.props;
		const isNew = !edit;
		const op = isNew ? 'New' : 'Edit';
		return (
			<Modal isOpen={this.props.show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}>{op} <b>objective</b></ModalHeader>
				<ModalBody>
					<EditObjectiveForm
					  ref={ f => { this.form = f } }
					  onChange={this.onFormChange} objective={objective} />
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submitObjective}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    createObjective : (o) => dispatch(createObjective(o)),
    updateObjective : (oid, update) => dispatch(updateObjective(oid, update))
}}

export default connect(null, mapDispatchToProps)(EditObjectiveModalForm);
