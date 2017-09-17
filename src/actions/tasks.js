import { 
	REQUEST_TASKS_LIST_PAGE,
	RECEIVE_TASKS_LIST_PAGE,
	INVALIDATE_TASKS_LIST,
	REQUEST_ADD_TASK,
	RECEIVE_ADD_TASK,
	CHANGE_VISIBLE_PAGE
} from './types';

import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';

function requestTasksListPage(page) {
	return { type : REQUEST_TASKS_LIST_PAGE, payload : {page} }
}

function receiveTasksListPage(tasksListPage) {
	return { type : RECEIVE_TASKS_LIST_PAGE, payload : tasksListPage }
}

function fetchTasksListPage(page) {
	return function(dispatch) {
		dispatch(requestTasksListPage(page));
		return superagent
			.get(Endpoints.GET_TASKS_LIST_PAGE(page))
			.set(...EndpointAuth)
			.then((response) => response.body)
			.then((tasksListPage) => dispatch(receiveTasksListPage(tasksListPage)))
	}
}

function shouldFetchTasksListPage(page, state) {
	if (state.tasksList.isFetching) return false;
	if (state.tasksList.didInvalidate) return true;
	return state.tasksList.tasksByPage[page] === undefined;
}

export function fetchTasksListPageIfNeeded(page = 1) {
	return function(dispatch, getState) {
		// fetch only if tasks are invalidated, or we don't
		// have the page fetched yet
		if (shouldFetchTasksListPage(page, getState().tasksView)) {
			dispatch(requestTasksListPage(page));
			return superagent
				.get(Endpoints.GET_TASKS_LIST_PAGE(page))
				.set(...EndpointAuth)
				.then((response) => response.body)
				.then((tasksListPage) => dispatch(receiveTasksListPage(tasksListPage)))
		}
	}
}

export function moveToPage(page) {
	return { type: CHANGE_VISIBLE_PAGE, payload: page }
}

function requestCreateTask() {
	return { type: REQUEST_ADD_TASK }
}

function receiveCreateTask(response) {
	return { type: RECEIVE_ADD_TASK, payload: response }
}

export function createTask(task) {
	return function(dispatch) {
		dispatch(requestCreateTask());
		return superagent
			.post(Endpoints.ADD_TASK())
			.set(...EndpointAuth)
			.send(task)
			.then(response => response.body)
			.then(body => dispatch(receiveCreateTask(body)))
			.then(() => dispatch(fetchTasksListPage(1))) // should dispatch a 'move to page 1'. it is invalidated to it will load again
	}
}

export function invalidateTasksList() {
	return { type: INVALIDATE_TASKS_LIST }
}