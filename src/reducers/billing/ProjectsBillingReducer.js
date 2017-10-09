import {
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
} from './../../actions/types';
import update from 'immutability-helper';

export function projectsBilling(state, action) {
	if (state === undefined) return {
		didInvalidate 	: true,
		isFetching 		: false,
		projects 		: []
	}

	switch (action.type) {
		case REQUEST_PROJECTS_BILLING:
			return update(state, {$set: { isFetching: true }})

		case RECEIVE_PROJECTS_BILLING:
			return update(state, {$set: { 
				isFetching: false,
				didInvalidate: false,
				projects: action.payload
			}})

		default:
			return state;
	}
	
}