import {
	INVALIDATE_PROJECTS_BILLING,
	INVALIDATE_INVOICES_LIST,
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	REQUEST_BILLING_FOR_PROJECT,
	RECEIVE_BILLING_FOR_PROJECT,
	REQUEST_ADD_INVOICE,
	RECEIVE_ADD_INVOICE,
	REQUEST_UPDATE_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	REQUEST_DELETE_INVOICE,
	RECEIVE_DELETE_INVOICE,
	REQUEST_INVOICES_LIST,
	RECEIVE_INVOICES_LIST
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addMessage, addError } from './messages';

export function invalidateProjectsBilling() {
	return { type: INVALIDATE_PROJECTS_BILLING }
}

export function invalidateInvoicesList() {
	return { type: INVALIDATE_INVOICES_LIST }
}

function requestAddInvoice() {
	return { type: REQUEST_ADD_INVOICE }
}

function receiveAddInvoice(result) {
	return { type: RECEIVE_ADD_INVOICE, payload: result }
}

export function addInvoice(invoice) {
	return function(dispatch, getState) {
		dispatch(requestAddInvoice());
		
		getMultipartRequestForInvoice(Endpoints.ADD_INVOICE(), invoice)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveAddInvoice(body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(invalidateInvoicesList()))
			.then(() => dispatch(addMessage(`Invoice added`, 'Invoice added')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Add invoice')));
	}
}

function getMultipartRequestForInvoice(url, invoice) {
	const request = superagent
		.post(url)
		.set(...EndpointAuth());

	// send as mutipart/form-data to include attachment
	Object.keys(invoice).filter(k => k !== 'attachment' 
		&& invoice[k] !== undefined && invoice[k] !== null).forEach(k => {
		console.log(k, invoice[k]);
		request.field(k, invoice[k])
	})
	// if attachment present, add
	if (invoice.attachment) {
		request.attach('attachment', invoice.attachment);
	}

	return request;
}

function requestUpdateInvoice(invoice) {
	return { type: REQUEST_UPDATE_INVOICE, payload: invoice }
}

function receiveUpdateInvoice(result) {
	return { type: RECEIVE_UPDATE_INVOICE, payload: result }
}

export function updateInvoice(invoice) {
	return function(dispatch) {
		dispatch(requestUpdateInvoice(invoice));

		getMultipartRequestForInvoice(Endpoints.UPDATE_INVOICE(invoice._id), invoice)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUpdateInvoice(body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(invalidateInvoicesList()))
			.then(() => dispatch(addMessage(invoice.description, 'Invoice updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update invoice')));
	}
}

function requestDeleteInvoice(invoiceId) {
	return { type: REQUEST_DELETE_INVOICE, payload: invoiceId }
}

function receiveDeleteInvoice(invoiceId, result) {
	return { type: RECEIVE_DELETE_INVOICE, payload: { invoiceId, result } }
}

export function deleteInvoice(invoiceId) {
	return function(dispatch) {
		dispatch(requestDeleteInvoice(invoiceId));
		superagent
			.delete(Endpoints.DELETE_INVOICE(invoiceId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveDeleteInvoice(invoiceId, body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(invalidateInvoicesList()))
			.then(() => dispatch(addMessage('', 'Invoice deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete invoice')));
	}
}

function requestProjectsBilling() {
	return { type: REQUEST_PROJECTS_BILLING }
}

function receiveProjectsBilling(projects) {
	return { type: RECEIVE_PROJECTS_BILLING, payload: projects }
}

function shouldFetchProjectsBilling(state) {
	if (state.isFetching) return false;
	return state.didInvalidate;
}

function fetchProjectsBilling() {
	return function(dispatch) {
		dispatch(requestProjectsBilling());
		superagent
			.get(Endpoints.GET_PROJECTS_BILLING())
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveProjectsBilling(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Projects billing')));
	}
}

export function fetchProjectsBillingIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchProjectsBilling(getState().billingView.projectsBilling)) {
			return dispatch(fetchProjectsBilling());
		}
	}
}

function requestBillingForProject(projectId) {
	return { type: REQUEST_BILLING_FOR_PROJECT, payload: projectId }
}

function receiveBillingForProject(project) {
	return { type: RECEIVE_BILLING_FOR_PROJECT, payload: project }
}

export function fetchBillingForProject(projectId) {
	return function(dispatch) {
		dispatch(requestBillingForProject(projectId));
		superagent
			.get(Endpoints.GET_BILLING_FOR_PROJECT(projectId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveBillingForProject(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Get project billing')));
	}
}

function requestInvoicesList() {
	return { type: REQUEST_INVOICES_LIST }
}

function receiveInvoicesList(invoices) {
	return { type: RECEIVE_INVOICES_LIST, payload: invoices }
}

function shouldFetchInvoicesList(state) {
	if (state.billingView.invoicesList.isFetching) return false;
	return state.billingView.invoicesList.didInvalidate;
}

export function fetchInvoicesListIfNeeded() {
	return function(dispatch, getState) {
		if (!shouldFetchInvoicesList(getState())) return;

		dispatch(requestInvoicesList());
		superagent
			.get(Endpoints.GET_INVOICES_LIST())
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveInvoicesList(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Get invoices list')));
	}
}
