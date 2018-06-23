import {  } from './endpoints';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { 
	REQUEST_USER_WORK_ENTRIES, 
	RECEIVE_USER_WORK_ENTRIES,
	SET_PROFILE_WORK_ENTRIES_FILTERS
} from './types';
import superagent from 'superagent';
import { addError } from './messages';

function requestUserWorkEntries(userId) {
	return { type: REQUEST_USER_WORK_ENTRIES, payload: userId }
}

function receiveUserWorkEntries(body) {
	return { type: RECEIVE_USER_WORK_ENTRIES, payload: body.entries }
}

function shouldFetchUserWorkEntries(state) {
	return state.didInvalidate && !state.isFetching;
}

export function fetchUserWorkEntriesIfNeeded(userId, filters = {}) {
	return function(dispatch, getState) {
		if (!shouldFetchUserWorkEntries(getState().profileView.workEntries)) return;

		dispatch(requestUserWorkEntries(userId));
		superagent
			.get(Endpoints.GET_WORK_ENTRIES_FOR_USER(userId, filters))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUserWorkEntries(body)))
			// error handling
			.catch(error => addError(error.message, 'User work entries'));
	}
}

export function setWorkEntriesFilters(filters) {
	return { type: SET_PROFILE_WORK_ENTRIES_FILTERS, payload: filters }
}