import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST,
	REQUEST_USER_AUTH,
	RECEIVE_USER_AUTH,
	REQUEST_UPDATE_USER,
	RECEIVE_UPDATE_USER,
	REQUEST_ADD_USER,
	RECEIVE_ADD_USER,
	REQUEST_DELETE_USER,
	RECEIVE_DELETE_USER,
	INVALIDATE_USERS_CACHE
} from './types';
import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addMessage, addError } from './messages';

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
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUserAuth(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Authorize user')))
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
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUsersList(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Fetch users list')))
	}
}

function shouldFetchUsersList(cache) {
	if (cache.users.isFetching) return false;
	return cache.users.didInvalidate;
}

export function fetchUsersListIfNeeded() {
	return function(dispatch, getState) {
		const cache = getState().cache;
		if (shouldFetchUsersList(cache)) {
			dispatch(fetchUsersList());
		}
	}
}

function requestDeleteUser(payload) {
	return { type: REQUEST_DELETE_USER, payload: payload }
}

function receiveDeleteUser(payload) {
	return { type: RECEIVE_DELETE_USER, payload: payload }
}

export function deleteUser(userId) {
	return function(dispatch, getState) {
		const user = getState().cache.users.usersById[userId];
		dispatch(requestDeleteUser(userId));
		superagent
			.delete(Endpoints.DELETE_USER(userId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveDeleteUser(body)))
			.then(() => dispatch(addMessage(user.full_name, 'User deleted')))
			.then(() => dispatch(invalidateUsersCache()))
			// error handling
			.catch(e => dispatch(addError(e.message, 'Delete user')))

	}
}

function invalidateUsersCache() {
	return { type: INVALIDATE_USERS_CACHE }
}

function requestUpdateUser(payload) {
	return { type: REQUEST_UPDATE_USER, payload: payload }
}

function receiveUpdateUser(payload) {
	return { type: RECEIVE_UPDATE_USER, payload: payload }
}

export function updateUser(userId, update) {
	return function(dispatch, getState) {
		const user = getState().cache.users.usersById[userId];
		const messageTitle = user.enabled !== update.enabled 
			? `User ${update.enabled ? 'enabled' : 'disabled'}` 
			: 'User updated';

		dispatch(requestUpdateUser(userId));
		superagent
			.post(Endpoints.UPDATE_USER(userId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUpdateUser(body)))
			.then(() => dispatch(addMessage(update.full_name, messageTitle)))
			.then(() => dispatch(invalidateUsersCache()))
			// error handling
			.catch(e => dispatch(addError(e.message, 'Update user')))
	}
}

function requestCreateUser(payload) {
	return { type: REQUEST_ADD_USER, payload: payload }
}

function receiveCreateUser(payload) {
	return { type: RECEIVE_ADD_USER, payload: payload }
}

export function createUser(user) {
	return function(dispatch) {
		dispatch(requestCreateUser(user));
		superagent
			.post(Endpoints.CREATE_USER())
			.set(...EndpointAuth())
			.send(user)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => { dispatch(receiveCreateUser(body)); return body; })
			.then(body => dispatch(addMessage(body.full_name, 'User created')))
			.then(() => dispatch(invalidateUsersCache()))
			// error handling
			.catch(e => dispatch(addError(e.message, 'Create user')))
	}
}
