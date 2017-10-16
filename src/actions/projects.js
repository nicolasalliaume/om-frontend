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
	RECEIVE_DELETE_INVOICE,
	REQUEST_ADD_PROJECT,
	RECEIVE_ADD_PROJECT,
	REQUEST_UPDATE_PROJECT,
	RECEIVE_UPDATE_PROJECT,
	REQUEST_DELETE_PROJECT,
	RECEIVE_DELETE_PROJECT,
	INVALIDATE_PROJECTS_CACHE,
	PROJECT_DASHBOARD_SET_VISIBLE_PROJECT,
	INVALIDATE_PROJECT_DASHBOARD
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
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
			.then(testForErrorReturned)
			.then(body => dispatch(receiveProjectsList(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Projects list')));
	}
}

function shouldFetchProjectsList(cache) {
	if (cache.projects.isFetching) return false;
	return cache.projects.didInvalidate;
}

export function fetchProjectsListIfNeeded() {
	return function(dispatch, getState) {
		const cache = getState().cache;
		if (shouldFetchProjectsList(cache)) {
			dispatch(fetchProjectsList());
		}
	}
}

function requestAddProject(payload) {
	return { type: REQUEST_ADD_PROJECT, payload }
}

function receiveAddProject(payload) {
	return { type: RECEIVE_ADD_PROJECT, payload }
}

export function addProject(project) {
	return function(dispatch) {
		dispatch(requestAddProject(project));
		superagent
			.post(Endpoints.ADD_PROJECT())
			.set(...EndpointAuth())
			.send(project)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveAddProject(body)))
			.then(() => dispatch(invalidateProjectsCache()))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage(project.name, 'Project created')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Create project')));
	}
}

function requestDeleteProject(payload) {
	return { type: REQUEST_DELETE_PROJECT, payload }
}

function receiveDeleteProject(projectId, response) {
	return { type: RECEIVE_DELETE_PROJECT, payload: { projectId, response } }
}

export function deleteProject(projectId) {
	return function(dispatch, getState) {
		const project = getState().cache.projects.projectsById[projectId];
		dispatch(requestDeleteProject(projectId));
		superagent
			.delete(Endpoints.DELETE_PROJECT(projectId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveDeleteProject(projectId, body)))
			.then(() => dispatch(invalidateProjectsCache()))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage(project.name, 'Project deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete project')));
	}
}

function requestUpdateProject(payload) {
	return { type: REQUEST_UPDATE_PROJECT, payload }
}

function receiveUpdateProject(payload) {
	return { type: RECEIVE_UPDATE_PROJECT, payload }
}

export function updateProject(projectId, update) {
	return function(dispatch, getState) {
		const project = getState().cache.projects.projectsById[projectId];
		dispatch(requestUpdateProject(projectId, update));
		superagent
			.post(Endpoints.UPDATE_PROJECT(projectId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUpdateProject(body)))
			.then(() => dispatch(invalidateProjectsCache()))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage(project.name, 'Project updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update project')));
	}
}

function invalidateProjectsCache() {
	return { type: INVALIDATE_PROJECTS_CACHE }
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
			.then(testForErrorReturned)
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
			.then(testForErrorReturned)
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
			.then(testForErrorReturned)
			.then(body => dispatch(receiveDeleteInvoice(projectId, invoiceId, body)))
			.then(() => dispatch(invalidateProjectsBilling()))
			.then(() => dispatch(addMessage('Invoice deleted for project ' + project.name, 'Invoice deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete invoice')));
	}
}

function invalidateProjectDashboard() {
	return { type: INVALIDATE_PROJECT_DASHBOARD }
}

export function setProjectDashboardVisibleProject(projectId) {
	return function(dispatch) {
		dispatch(invalidateProjectDashboard());
		dispatch({ type: PROJECT_DASHBOARD_SET_VISIBLE_PROJECT, payload: projectId });
	}
}

