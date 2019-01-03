import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
		};
	}

	componentWillMount() {
		const { objective } = this.props;

		if ( objective !== undefined ) {
			const formattedDate = moment.utc( objective.objective_date ).format( 'YYYY-MM-DD' );
			this.setState( () => ( { 
				objective : update( objective, {
					objective_date : { $set: formattedDate }
				} ) 
			} ) );
		}
	}

	componentWillReceiveProps = props => {
		const taskChanged = JSON.stringify( this.state.objective.related_task ) !== 
			JSON.stringify( props.objective.related_task );

		// update task props if task is edited
		if ( taskChanged ) {
			this.setState( state => update( state, {
				objective: {
					related_task: { $set: props.objective.related_task }
				}
			} ) );
		}
	}
	
	submitObjective = () => {
		if ( !this.form.validate() ) return;

		const { edit, createObjective, updateObjective } = this.props;
		const { objective } = this.state;
		const isNew = !edit;
		
		if ( isNew ) createObjective( objective );
		else updateObjective( objective._id, objective );

		this.props.toggle();
	}
	
	onFormChange = ( newState ) => {
		this.setState( { objective : newState.objective } );
	}

	openEditTaskModal = () => {
		const taskId = this.state.objective.related_task._id;
		this.props.history.push( `/task/${ taskId.toString() }` );
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
					  ref={ f => { this.form = f; } }
					  onChange={this.onFormChange} objective={objective} />
				</ModalBody>
				<ModalFooter>
					{ objective.related_task && (
						<Button color="secondary" className='mr-auto' 
						  onClick={this.openEditTaskModal}>
							Edit task
						</Button>
					) }
					<Button color="primary" onClick={this.submitObjective}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapDispatchToProps = dispatch => { return {
	createObjective : ( o ) => dispatch( createObjective( o ) ),
	updateObjective : ( oid, update ) => dispatch( updateObjective( oid, update ) )
};};

export default withRouter( connect( null, mapDispatchToProps )( EditObjectiveModalForm ) );
