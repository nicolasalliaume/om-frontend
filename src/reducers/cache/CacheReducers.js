import {
	REQUEST_USERS_LIST,
	RECEIVE_USERS_LIST,
	REQUEST_PROJECTS_LIST,
	RECEIVE_PROJECTS_LIST
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
			return update(state, {users: {
				usersById: {$set: usersById}, 
				isFetching: {$set: false} }})
		
		case REQUEST_PROJECTS_LIST:
			return update(state, {projects: {$set: { isFetching: true, projectsById: {} }}})

		case RECEIVE_PROJECTS_LIST:
			const projectsById = {};
			action.payload.forEach((project) => { 
				projectsById[project._id] = project;
			})
			return update(state, {projects: {
				projectsById: {$set: projectsById}, 
				isFetching: {$set: false} }})
		default:
			return state;
	}
	
}