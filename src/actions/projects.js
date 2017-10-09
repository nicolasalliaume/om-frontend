import {
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST,
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING
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