import {
	REQUEST_GET_INTEGRATIONS,
	RECEIVE_GET_INTEGRATIONS
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
		default:
			return state;
	}
}