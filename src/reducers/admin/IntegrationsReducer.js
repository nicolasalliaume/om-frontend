import {
	REQUEST_GET_INTEGRATIONS,
	RECEIVE_GET_INTEGRATIONS,
	INVALIDATE_INTEGRATIONS_LIST
} from './../../actions/types';
import update from 'immutability-helper';

export function integrations(state, action) {
	if (state === undefined) return {
		isFetching 		 : false,
		didInvalidate 	 : true,
		lastUpdated 	 : null,
		integrationsList : []
	}

	switch (action.type) {
		case REQUEST_GET_INTEGRATIONS:
			return update(state, {isFetching: {$set: true}})
		case RECEIVE_GET_INTEGRATIONS:
			return update(state, {
				isFetching: {$set: false},
				didInvalidate: {$set: false},
				lastUpdated: {$set: new Date()},
				integrationsList: {$set: action.payload}
			})
		case INVALIDATE_INTEGRATIONS_LIST:
			return update(state, {didInvalidate: {$set: true}})
		default:
			return state;
	}
}