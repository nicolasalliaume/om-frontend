import { ADD_ERROR, ADD_MESSAGE, DISMISS_MESSAGE } from '../../actions/types';
import moment from 'moment';

export function messages(state, action) {
	if (state === undefined) return [ ];

	switch (action.type) {
		case ADD_ERROR:
			return state.concat([getMessage('error', action.payload)]);
		case ADD_MESSAGE:
			return state.concat([getMessage('info', action.payload)]);
		case DISMISS_MESSAGE:
			return state.filter((_, i) => i !== 0);
		default:
			return state;
	}
}

function getMessage(type, payload) {
	return {
		type 	: type,
		title 	: payload.title || type,
		message : payload.message,
		expires	: moment().add(5, 'seconds').toDate()
	}
}