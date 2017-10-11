import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST,
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST,
	INVALIDATE_USERS_CACHE,
	INVALIDATE_PROJECTS_CACHE
} from './../../actions/types';
import update from 'immutability-helper';

export function cache(state, action) {
	if (state === undefined) return {
		users : { usersById : {}, isFetching: false, didInvalidate: true },
		projects : { projectsById : {}, isFetching: false, didInvalidate: true }
	}

	switch (action.type) {
		case REQUEST_USERS_LIST:
			return update(state, {users: {isFetching: { $set: true }}})
		
		case RECEIVE_USERS_LIST:
			const usersById = {};
			action.payload.forEach((user) => { 
				usersById[user._id] = user 
			})
			return update(state, {users: {
				usersById: {$set: usersById}, 
				isFetching: {$set: false},
				didInvalidate: {$set: false} }})
		
		case REQUEST_PROJECTS_LIST:
			return update(state, {projects: { isFetching: { $set: true }}})

		case RECEIVE_PROJECTS_LIST:
			const projectsById = {};
			action.payload.forEach((project) => { 
				projectsById[project._id] = project;
			})
			return update(state, {projects: {
				projectsById: {$set: projectsById}, 
				isFetching: {$set: false},
				didInvalidate: {$set: false} }})

		case INVALIDATE_USERS_CACHE:
			return update(state, {users: {didInvalidate: { $set: true }}})

		case INVALIDATE_PROJECTS_CACHE:
			return update(state, {projects: {didInvalidate: { $set: true }}})			

		default:
			return state;
	}
	
}