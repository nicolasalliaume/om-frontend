import {
	INVALIDATE_PROJECTS_BILLING,
	INVALIDATE_INVOICES_LIST,
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	REQUEST_ADD_INVOICE,
	RECEIVE_ADD_INVOICE,
	REQUEST_UPDATE_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	REQUEST_DELETE_INVOICE,
	RECEIVE_DELETE_INVOICE,
	REQUEST_INVOICES_LIST,
	RECEIVE_INVOICES_LIST,
	REQUEST_SEND_PAYPAL_INVOICE,
	RECEIVE_SEND_PAYPAL_INVOICE,
	ERROR_SEND_PAYPAL_INVOICE,
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addMessage, addError } from './messages';
import update from 'immutability-helper';

export function invalidateProjectsBilling() {
	return { type: INVALIDATE_PROJECTS_BILLING };
}

export function invalidateInvoicesList() {
	return { type: INVALIDATE_INVOICES_LIST };
}

function requestAddInvoice() {
	return { type: REQUEST_ADD_INVOICE };
}

function receiveAddInvoice( result ) {
	return { type: RECEIVE_ADD_INVOICE, payload: result };
}

function cleanInvoiceData( invoice ) {
	let invoiceData = invoice;
	
	invoiceData = update( invoiceData, { 
		created_by: { 
			$set: invoiceData.created_by._id 
		},
	} );

	if ( invoiceData.project === '' ) update( invoiceData, {
		project: { $set: null }
	} );

	return invoiceData;
}

export function addInvoice( _invoice ) {
	return function( dispatch, getState ) {
		const invoice = cleanInvoiceData( _invoice );
		dispatch( requestAddInvoice( invoice ) );
		getMultipartRequestForInvoice( Endpoints.ADD_INVOICE(), invoice )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveAddInvoice( body ) ) )
			.then( () => dispatch( addMessage( 'Invoice added', 'Invoice added' ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Add invoice' ) ) );
	};
}

function getMultipartRequestForInvoice( url, invoice ) {
	const request = superagent
		.post( url )
		.set( ...EndpointAuth() );

	// send as mutipart/form-data to include attachment
	Object.keys( invoice ).filter( k => k !== 'attachment'
		&& invoice[k] !== undefined && invoice[k] !== null ).forEach( k => {
		// workaround bug w/superagent here for array values
		if ( Array.isArray( invoice[k] ) ) {
			for ( var i = 0; i < invoice[k].length; i++ ) {
				request.field( `${k}[]`, invoice[k][i] );
			}
		} else {
			request.field( k, invoice[k] );
		}
	} );
	// if attachment present, add
	if ( invoice.attachment ) {
		request.attach( 'attachment', invoice.attachment );
	}

	return request;
}

function requestUpdateInvoice( invoice ) {
	return { type: REQUEST_UPDATE_INVOICE, payload: invoice };
}

function receiveUpdateInvoice( result ) {
	return { type: RECEIVE_UPDATE_INVOICE, payload: result };
}

export function updateInvoice( _invoice ) {
	return function( dispatch ) {
		const invoice = cleanInvoiceData( _invoice );
		dispatch( requestUpdateInvoice( invoice ) );
		getMultipartRequestForInvoice( Endpoints.UPDATE_INVOICE( invoice._id ), invoice )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveUpdateInvoice( body ) ) )
			.then( () => dispatch( addMessage( invoice.description, 'Invoice updated' ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Update invoice' ) ) );
	};
}

function requestDeleteInvoice( invoiceId ) {
	return { type: REQUEST_DELETE_INVOICE, payload: invoiceId };
}

function receiveDeleteInvoice( invoiceId, result ) {
	return { type: RECEIVE_DELETE_INVOICE, payload: { invoiceId, result } };
}

export function deleteInvoice( invoiceId ) {
	return function( dispatch ) {
		dispatch( requestDeleteInvoice( invoiceId ) );
		superagent
			.delete( Endpoints.DELETE_INVOICE( invoiceId ) )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveDeleteInvoice( invoiceId, body ) ) )
			.then( () => dispatch( addMessage( '', 'Invoice deleted' ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Delete invoice' ) ) );
	};
}

function requestProjectsBilling() {
	return { type: REQUEST_PROJECTS_BILLING };
}

function receiveProjectsBilling( projects ) {
	return { type: RECEIVE_PROJECTS_BILLING, payload: projects };
}

function shouldFetchProjectsBilling( state ) {
	if ( state.isFetching ) return false;
	return state.didInvalidate;
}

function fetchProjectsBilling() {
	return function( dispatch ) {
		dispatch( requestProjectsBilling() );
		superagent
			.get( Endpoints.GET_PROJECTS_BILLING() )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveProjectsBilling( body ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Projects billing' ) ) );
	};
}

export function fetchProjectsBillingIfNeeded() {
	return function( dispatch, getState ) {
		if ( shouldFetchProjectsBilling( getState().billingView.projectsBilling ) ) {
			return dispatch( fetchProjectsBilling() );
		}
	};
}

function requestInvoicesList() {
	return { type: REQUEST_INVOICES_LIST };
}

function receiveInvoicesList( invoices ) {
	return { type: RECEIVE_INVOICES_LIST, payload: invoices };
}

function shouldFetchInvoicesList( state ) {
	if ( state.billingView.invoicesList.isFetching ) return false;
	return state.billingView.invoicesList.didInvalidate;
}

export function fetchInvoicesListIfNeeded() {
	return function( dispatch, getState ) {
		if ( !shouldFetchInvoicesList( getState() ) ) return;

		dispatch( requestInvoicesList() );
		superagent
			.get( Endpoints.GET_INVOICES_LIST() )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveInvoicesList( body ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Get invoices list' ) ) );
	};
}

export function syncFetchInvoiceWithId( invoiceId, cb ) {
	return function( dispatch ) {
		superagent
			.get( Endpoints.GET_INVOICES_WITH_QUERY( { _id: invoiceId } ) )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => cb( body.invoices[0] ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Fetch invoice sync' ) ) );
	};
}

function requestSendPaypalInvoice() {
	return { type: REQUEST_SEND_PAYPAL_INVOICE };
}

function receiveSendPaypalInvoice() {
	return { type: RECEIVE_SEND_PAYPAL_INVOICE };
}

function errorSendPaypalInvoice( error ) {
	return { type: ERROR_SEND_PAYPAL_INVOICE, payload: error };
}

export function sendPaypalInvoice( invoiceId ) {
	return function( dispatch ) {
		dispatch( requestSendPaypalInvoice() );
		superagent
			.post( Endpoints.SEND_PAYPAL_INVOICE( invoiceId ) )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( () => dispatch( receiveSendPaypalInvoice() ) )
			// error handling
			.catch( error => {
				dispatch( addError( error.message, 'Send invoice' ) ); 
				dispatch( errorSendPaypalInvoice( error ) );
			} );
	};
}
