import {
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST,
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	REQUEST_ADD_INVOICE,
	RECEIVE_ADD_INVOICE,
	INVALIDATE_PROJECTS_BILLING,
	REQUEST_UPDATE_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	REQUEST_DELETE_INVOICE,
	RECEIVE_DELETE_INVOICE
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';
import { addMessage, addError } from './messages';

function requestProjectsList() {
	return { type: REQUEST_PROJECTS_LIST }
}

function receiveProjectsList(response) {
	return { type: RECEIVE_PROJECTS_LIST, payload: response.projects }
}

function fetchProjectsList() {
	return function(dispatch) {
		dispatch(requestProjectsList());
		superagent
			.get(Endpoints.GET_PROJECTS_LIST())
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(body => dispatch(receiveProjectsList(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Projects list')));
	}
}

function shouldFetchProjectsList(cache) {
	if (!cache.projects) return true;
	return false; // we're either fetching or we fetched them already
}

export function fetchProjectsListIfNeeded() {
	return function(dispatch, getState) {
		const cache = getState().cache;
		if (shouldFetchProjectsList(cache)) {
			dispatch(fetchProjectsList());
		}
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

export function invalidateProjectsBilling() {
	return { type: INVALIDATE_PROJECTS_BILLING }
}

function requestAddInvoice(projectId) {
	return { type: REQUEST_ADD_INVOICE, payload: projectId }
}

function receiveAddInvoice(result) {
	return { type: RECEIVE_ADD_INVOICE, payload: result }
}

export function addInvoiceToProject(projectId, invoice) {
	return function(dispatch, getState) {
		// find project to show name in message
		const project = findProjectById(projectId, 
			getState().billingView.projectsBilling.projects);

		dispatch(requestAddInvoice(projectId));
		superagent
			.post(Endpoints.ADD_INVOICE(projectId))
			.set(...EndpointAuth())
			.send(invoice)
			.then(response => response.body)
			.then(body => dispatch(receiveAddInvoice(body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage(`Invoice added for project "${project.name}"`, 'Invoice added')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Add invoice')));
	}
}

function requestUpdateInvoice(projectId, invoice) {
	return { type: REQUEST_UPDATE_INVOICE, payload: { projectId, invoice } }
}

function receiveUpdateInvoice(result) {
	return { type: RECEIVE_UPDATE_INVOICE, payload: result }
}

export function updateInvoice(projectId, invoice) {
	return function(dispatch, getState) {
		dispatch(requestUpdateInvoice(projectId, invoice));
		superagent
			.post(Endpoints.UPDATE_INVOICE(projectId, invoice._id))
			.set(...EndpointAuth())
			.send(invoice)
			.then(response => response.body)
			.then(body => dispatch(receiveUpdateInvoice(body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage(invoice.description, 'Invoice updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update invoice')));
	}
}

function findProjectById(id, projects) {
	return projects.filter(p => p._id === id)[0];
}

function requestDeleteInvoice(projectId, invoiceId) {
	return { type: REQUEST_DELETE_INVOICE, payload: { projectId, invoiceId } }
}

function receiveDeleteInvoice(projectId, invoiceId, result) {
	return { type: RECEIVE_DELETE_INVOICE, payload: { projectId, invoiceId, result } }
}

export function deleteInvoice(projectId, invoiceId) {
	return function(dispatch, getState) {
		// find project to show name in message
		const project = findProjectById(projectId, 
			getState().billingView.projectsBilling.projects);

		dispatch(requestDeleteInvoice(projectId, invoiceId));
		superagent
			.delete(Endpoints.DELETE_INVOICE(projectId, invoiceId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(body => dispatch(receiveDeleteInvoice(projectId, invoiceId, body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage('Invoice deleted for project ' + project.name, 'Invoice deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete invoice')));
	}
}
