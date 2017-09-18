import {
	REQUEST_USER_AUTH,
	RECEIVE_USER_AUTH
} from './../../actions/types';
import update from 'immutability-helper';

export function currentUser(state, action) {
	if (state === undefined) return { }

	switch (action.type) {
		case RECEIVE_USER_AUTH:
			return action.payload;

		default:
			return state;
	}
}