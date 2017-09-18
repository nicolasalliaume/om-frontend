import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST,
	REQUEST_USER_AUTH,
	RECEIVE_USER_AUTH
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';

function requestUserAuth() {
	return { type: REQUEST_USER_AUTH }
}

function receiveUserAuth(payload) {
	return { type: RECEIVE_USER_AUTH, payload: payload }
}

export function authUserWithAuthToken(authToken) {
	return function(dispatch) {
		dispatch(requestUserAuth());
		superagent
			.post(Endpoints.AUTH_USER_LINK())
			.send({ authToken })
			.then(response => response.body)
			.then(body => dispatch(receiveUserAuth(body)))
	}
}

function requestUsersList() {
	return { type: REQUEST_USERS_LIST }
}

function receiveUsersList(response) {
	return { type: RECEIVE_USERS_LIST, payload: response.users }
}

function fetchUsersList() {
	return function(dispatch) {
		dispatch(requestUsersList());
		superagent
			.get(Endpoints.GET_USERS_LIST())
			.set(...EndpointAuth)
			.then(response => response.body)
			.then(body => dispatch(receiveUsersList(body)))
	}
}

function shouldFetchUsersList(cache) {
	if (!cache.users) return true;
	return false; // we're either fetching or we fetched them already
}

export function fetchUsersListIfNeeded() {
	return function(dispatch, getState) {
		const cache = getState().cache;
		if (shouldFetchUsersList(cache)) {
			dispatch(fetchUsersList());
		}
	}
}