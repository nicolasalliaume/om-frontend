import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST
} from './../../actions/types';
import update from 'immutability-helper';

export function cache(state, action) {
	if (state === undefined) return { }

	switch (action.type) {
		case REQUEST_USERS_LIST:
			return update(state, {users: {$set: { isFetching: true, usersById: {} }}})
		case RECEIVE_USERS_LIST:
			const usersById = {};
			action.payload.forEach((user) => { 
				usersById[user._id] = user 
			})
			return update(state, {users: {usersById: {$set: usersById} }})
	}

	return state;
}