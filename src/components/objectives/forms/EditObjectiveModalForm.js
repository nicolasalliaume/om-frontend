import React, { Component } from 'react';
import { connect } from 'react-redux';	
import moment from 'moment';
import update from 'immutability-helper';
import { 
	Row, 
	Col, 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
} from 'reactstrap';
import EditObjectiveForm from './EditObjectiveForm';
import { 
	createObjective, 
	invalidateObjectivesList,
	updateObjective 
} from './../../../actions/objectives';

class EditObjectiveModalForm extends Component {
	constructor() {
		super();
		this.state = { 
			objective : null
		}
	}
	componentWillMount() {
		this.setState({ 
			objective 	: this.props.objective || {
				no_task_title 	: '',
				owners 			: ['59b5703bb4cbe91469de7e9f'],
				objective_date 	: moment().format('YYYY-MM-DD'),
				created_by 		: '59b5703bb4cbe91469de7e9f',
				level 			: 'day',
				progress 		: 0
			} });
	}
	submitObjective = () => {
		const { edit, createObjective, updateObjective } = this.props;
		const { objective } = this.state;
		const isNew = !edit;
		
		if (isNew) createObjective(objective);
		else updateObjective(objective);
		
		this.props.invalidateObjectivesList();
		this.toggle();
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
			<div>
				<Modal isOpen={this.props.show} toggle={toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>{op} <b>objective</b></ModalHeader>
					<ModalBody>
						<EditObjectiveForm onChange={this.onFormChange} objective={objective} />
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.submitObjective}>Done</Button>{' '}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    createObjective : (o) => dispatch(createObjective(o)),
    updateObjective : (o) => dispatch(updateObjective(o)),
    invalidateObjectivesList : () => dispatch(invalidateObjectivesList())
}}

export default connect(null, mapDispatchToProps)(EditObjectiveModalForm);
