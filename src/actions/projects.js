import {
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';

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
			.set(...EndpointAuth)
			.then(response => response.body)
			.then(body => dispatch(receiveProjectsList(body)))
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