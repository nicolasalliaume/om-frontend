import { 
	REQUEST_TASKS_LIST_PAGE,
	RECEIVE_TASKS_LIST_PAGE,
	CHANGE_VISIBLE_PAGE,
	INVALIDATE_TASKS_LIST
} from './../../actions/types';

import update from 'immutability-helper';


export function tasksView(state, action) {
	if (state === undefined) return {
		tasksList 	: tasksList(),
		visiblePage	: 1
	}

	switch (action.type) {
		case CHANGE_VISIBLE_PAGE:
			return update(state, {visiblePage: {$set: action.payload}})
		case REQUEST_TASKS_LIST_PAGE:
		case RECEIVE_TASKS_LIST_PAGE:
		case INVALIDATE_TASKS_LIST:
			return update(state, {
				tasksList: {
					$set: tasksList(state.tasksList, action)}})
		default:
			return state;
	}
}

function tasksList(state, action) {
	if (state === undefined) return {
		didInvalidate 	: true,
		lastUpdated		: null,
		isFetching		: false,
		tasksByPage		: tasksListByPage(),
		cursor 			: {}
	}

	switch (action.type) {
		case INVALIDATE_TASKS_LIST:
			return update(state, {didInvalidate : {$set: true}})
		case REQUEST_TASKS_LIST_PAGE:
			return update(state, {isFetching: {$set: true}})
		case RECEIVE_TASKS_LIST_PAGE:
			const { cursor } = action.payload;
			return update(state, {
				isFetching		: {$set: false},
				didInvalidate 	: {$set: false},
				lastUpdated 	: {$set: new Date()},
				cursor 			: {$set: cursor},
				tasksByPage 	: {$set: tasksListByPage(state.tasksByPage, action)}
			})
		default: 
			return state;
	}
}

function tasksListByPage(state, action) {
	if (state === undefined) return {};

	switch (action.type) {
		case RECEIVE_TASKS_LIST_PAGE:
			const { cursor, tasks } = action.payload;
			const page = parseInt(cursor.current_page);

			return update(state, {[page]: {$set: tasks}})
		
		default: 
			return state;
	}
}
