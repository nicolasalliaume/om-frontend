import {
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	INVALIDATE_PROJECTS_BILLING,
	RECEIVE_ADD_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	RECEIVE_DELETE_INVOICE,
} from './../../actions/types';
import update from 'immutability-helper';

export function projectsBilling(state, action) {
	if (state === undefined) return {
		didInvalidate 	: true,
		isFetching 		: false,
		projectsById 	: {},
	}

	switch (action.type) {
		case REQUEST_PROJECTS_BILLING:
			return update(state, {isFetching: { $set: true }})

		case INVALIDATE_PROJECTS_BILLING:
		case RECEIVE_ADD_INVOICE:
		case RECEIVE_UPDATE_INVOICE:
		case RECEIVE_DELETE_INVOICE:
			return update(state, {didInvalidate: { $set: true }})

		case RECEIVE_PROJECTS_BILLING:
			const reduceById = a => a.reduce((o, p) => Object.assign(o, { [p._id]: p }), {});
			return update(state, {$set: { 
				isFetching: false,
				didInvalidate: false,
				projectsById: reduceById(action.payload)
			}})

		default:
			return state;
	}
	
}