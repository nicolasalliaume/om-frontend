import {
	REQUEST_GET_ALARMS,
	RECEIVE_GET_ALARMS,
	INVALIDATE_ALARMS_LIST
} from './../../actions/types';
import update from 'immutability-helper';

export function alarms(state, action) {
	if (state === undefined) return {
		isFetching 		: false,
		didInvalidate 	: true,
		lastUpdated 	: null,
		alarmsList 		: [],
	}

	switch (action.type) {
		case REQUEST_GET_ALARMS:
			return update(state, {isFetching: {$set: true}})
		case RECEIVE_GET_ALARMS:
			return update(state, {
				isFetching: {$set: false},
				didInvalidate: {$set: false},
				lastUpdated: {$set: new Date()},
				alarmsList: {$set: action.payload}
			})
		case INVALIDATE_ALARMS_LIST:
			return update(state, {didInvalidate: {$set: true}})
		default:
			return state;
	}
}