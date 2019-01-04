import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';
import EditInvoiceModalForm from '../components/billing/invoices/EditInvoiceModalForm';
import OverlayedObjectiveModal from '../components/objectives/forms/ViewObjectiveModalForm';
import EditTaskModalForm from '../components/tasks/forms/EditTaskModalForm';
import { syncFetchInvoiceWithId } from '../actions/billing';
import { syncFetchTaskWithId } from '../actions/tasks';

export default class ModalContainer extends Component {
	render() {
		return (
			<div>
				<Route path='*/objective/:oid' component={withRouter( ObjectiveModalContainer )} />
				<Route path='*/invoice/:iid' component={withRouter( InvoiceModalContainer )} />
				<Route path='*/task/:tid' component={withRouter( TaskModalContainer )} />
			</div>
		);
	}
}

function ObjectiveModalContainer( props ) {
	const close = _ => {
		props.history.push( props.location.pathname.replace( /\/objective\/[a-zA-Z0-9]+/, '' ) );
	};
	return (
		<OverlayedObjectiveModal 
			show={true}
			objectiveId={props.match.params.oid}
			toggle={close} />
	);
}

const InvoiceModalContainer = connect()( class extends Component {
	constructor( props ) {
		super( props );
		this.state = { invoice: null };
		
		const _this = this;
		this.props.dispatch( syncFetchInvoiceWithId( props.match.params.iid, invoice => {
			if ( invoice ) _this.setState( { invoice } );
		} ) );
	}
	
	close = _ => {
		this.props.history.push( this.props.location.pathname.replace( /\/invoice\/[a-zA-Z0-9]+/, '' ) );
	}
	
	render() {
		if ( !this.state.invoice ) return <span/>;
		return (
			<EditInvoiceModalForm edit
				show={true}
				invoice={this.state.invoice}
				toggle={this.close} />
		);
	}
} );

const TaskModalContainer = connect()( class extends Component {
	constructor( props ) {
		super( props );
		this.state = { task: null };
		
		const _this = this;
		this.props.dispatch( syncFetchTaskWithId( props.match.params.tid, task => {
			if ( task ) _this.setState( { task } );
		} ) );
	}

	close = _ => {
		this.props.history.push( this.props.location.pathname.replace( /\/task\/[a-zA-Z0-9]+/, '' ) );
	}

	render() {
		if ( !this.state.task ) return <span/>;
		return (
			<EditTaskModalForm 
				show={true}
				task={this.state.task}
				toggle={this.close} />
		);
	}

} );

