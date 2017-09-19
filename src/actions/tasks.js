import { 
	REQUEST_TASKS_LIST_PAGE,
	RECEIVE_TASKS_LIST_PAGE,
	INVALIDATE_TASKS_LIST,
	REQUEST_ADD_TASK,
	RECEIVE_ADD_TASK,
	CHANGE_VISIBLE_PAGE,
	REQUEST_UPDATE_TASK,
	RECEIVE_UPDATE_TASK,
	REQUEST_DELETE_TASK,
	RECEIVE_DELETE_TASK
} from './types';

import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';
import { invalidateObjectivesList } from './objectives';
import { invalidateLatestActivity } from './activity';

function requestUpdateTask(taskId) {
	return { type : REQUEST_UPDATE_TASK, payload : taskId }
}

function receiveUpdateTask(response) {
	return { type : RECEIVE_UPDATE_TASK, payload : response }
}

export function updateTask(taskId, update) {
	return function(dispatch) {
		dispatch(requestUpdateTask(taskId));
		superagent
			.post(Endpoints.UPDATE_TASK(taskId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(body => dispatch(receiveUpdateTask(body)))
			.then(() => dispatch(invalidateTasksList()))
			.then(() => dispatch(invalidateObjectivesList())) // may have changed
			.then(() => dispatch(invalidateLatestActivity()))
	}
}

function requestDeleteTask(taskId) {
	return { type : REQUEST_DELETE_TASK, payload : taskId }
}

function receiveDeleteTask(response) {
	return { type : RECEIVE_DELETE_TASK, payload : response }
}

export function deleteTask(taskId) {
	return function(dispatch) {
		dispatch(requestDeleteTask(taskId));
		superagent
			.delete(Endpoints.DELETE_TASK(taskId))
			.set(...EndpointAuth())
			.then((response) => response.body)
			.then(body => dispatch(receiveDeleteTask(body)))
			.then(() => dispatch(invalidateTasksList()))
			.then(() => dispatch(invalidateObjectivesList())) // may have changed
			.then(() => dispatch(invalidateLatestActivity())) // may have changed
	}
}

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
			.set(...EndpointAuth())
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
				.set(...EndpointAuth())
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
			.set(...EndpointAuth())
			.send(task)
			.then(response => response.body)
			.then(body => dispatch(receiveCreateTask(body)))
			.then(() => dispatch(invalidateTasksList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(moveToPage(1)))
	}
}

export function invalidateTasksList() {
	return { type: INVALIDATE_TASKS_LIST }
}