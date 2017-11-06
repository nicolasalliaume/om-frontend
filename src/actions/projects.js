import {
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST,
	REQUEST_ADD_PROJECT,
	RECEIVE_ADD_PROJECT,
	REQUEST_UPDATE_PROJECT,
	RECEIVE_UPDATE_PROJECT,
	REQUEST_DELETE_PROJECT,
	RECEIVE_DELETE_PROJECT,
	INVALIDATE_PROJECTS_CACHE,
	PROJECT_DASHBOARD_SET_VISIBLE_PROJECT,
	INVALIDATE_PROJECT_DASHBOARD,
	REQUEST_PROJECT_WORK_ENTRIES,
	RECEIVE_PROJECT_WORK_ENTRIES,
	SET_PROJECT_DASHBOARD_WORK_ENTRIES_FILTER
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addMessage, addError } from './messages';
import { invalidateProjectsBilling } from './billing';

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

function invalidateProjectDashboard() {
	return { type: INVALIDATE_PROJECT_DASHBOARD }
}

export function setProjectDashboardVisibleProject(projectId) {
	return function(dispatch) {
		dispatch(invalidateProjectDashboard());
		dispatch({ type: PROJECT_DASHBOARD_SET_VISIBLE_PROJECT, payload: projectId });
	}
}

function requestWorkEntriesForProject(projectId) {
	return { type: REQUEST_PROJECT_WORK_ENTRIES, payload: projectId }
}

function receiveWorkEntriesForProject(workEntries) {
	return { type: RECEIVE_PROJECT_WORK_ENTRIES, payload: workEntries }
}

export function fetchWorkEntriesForProject(projectId) {
	return function(dispatch, getState) {
		const filters = getState().projectDashboardView.workEntries.filters;
		dispatch(requestWorkEntriesForProject(projectId))
		superagent
			.get(Endpoints.GET_WORK_ENTRIES_FOR_PROJECT(projectId, filters))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveWorkEntriesForProject(body.entries)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Get work entries')));
	}
}

export function setProjectDashboardWorkEntriesFilters(filters) {
	return { type: SET_PROJECT_DASHBOARD_WORK_ENTRIES_FILTER, payload: filters}
}