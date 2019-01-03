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
	RECEIVE_DELETE_TASK,
	APPLY_TASKS_LIST_FILTERS
} from './types';

import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { invalidateObjectivesList, createObjectiveFromTask } from './objectives';
import { invalidateLatestActivity } from './activity';
import { addMessage, addError } from './messages';

export function applyTasksListFilters( filters ) {
	return { type : APPLY_TASKS_LIST_FILTERS , payload : filters };
}

function requestUpdateTask( taskId ) {
	return { type : REQUEST_UPDATE_TASK, payload : taskId };
}

function receiveUpdateTask( response ) {
	return { type : RECEIVE_UPDATE_TASK, payload : response };
}

export function updateTask( taskId, update ) {
	return function( dispatch, getState ) {
		// get task to show title on info
		const task = findTaskById( taskId, getState().tasksView.tasksList.tasksByPage );
		const title = update.title || task.title;

		dispatch( requestUpdateTask( taskId ) );
		superagent
			.post( Endpoints.UPDATE_TASK( taskId ) )
			.set( ...EndpointAuth() )
			.send( update )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveUpdateTask( body ) ) )
			.then( () => dispatch( invalidateTasksList() ) )
			.then( () => dispatch( invalidateObjectivesList() ) ) // may have changed
			.then( () => dispatch( invalidateLatestActivity() ) )
			.then( () => dispatch( addMessage( title, 'Task updated' ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Update task' ) ) );
	};
}

function requestDeleteTask( taskId ) {
	return { type : REQUEST_DELETE_TASK, payload : taskId };
}

function receiveDeleteTask( response ) {
	return { type : RECEIVE_DELETE_TASK, payload : response };
}

export function deleteTask( taskId ) {
	return function( dispatch, getState ) {
		// get task to show title on info
		const task = findTaskById( taskId, getState().tasksView.tasksList.tasksByPage );

		dispatch( requestDeleteTask( taskId ) );
		superagent
			.delete( Endpoints.DELETE_TASK( taskId ) )
			.set( ...EndpointAuth() )
			.then( ( response ) => response.body )
			.then( testForErrorReturned )
			.then( body => dispatch( receiveDeleteTask( body ) ) )
			.then( () => dispatch( invalidateTasksList() ) )
			.then( () => dispatch( invalidateObjectivesList() ) ) // may have changed
			.then( () => dispatch( invalidateLatestActivity() ) ) // may have changed
			.then( () => dispatch( addMessage( task.title, 'Task deleted' ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Delete task' ) ) );
	};
}

function requestTasksListPage( page ) {
	return { type : REQUEST_TASKS_LIST_PAGE, payload : { page } };
}

function receiveTasksListPage( tasksListPage ) {
	return { type : RECEIVE_TASKS_LIST_PAGE, payload : tasksListPage };
}

function shouldFetchTasksListPage( page, state ) {
	if ( state.tasksList.isFetching ) return false;
	if ( state.tasksList.didInvalidate ) return true;
	return state.tasksList.tasksByPage[page] === undefined;
}

export function fetchTasksListPageIfNeeded( page = 1 ) {
	return function( dispatch, getState ) {
		// fetch only if tasks are invalidated, or we don't
		// have the page fetched yet
		if ( shouldFetchTasksListPage( page, getState().tasksView ) ) {
			dispatch( requestTasksListPage( page ) );
			const { filters } = getState().tasksView.tasksList;
			return superagent
				.get( Endpoints.GET_TASKS_LIST_PAGE( page, filters ) )
				.set( ...EndpointAuth() )
				.then( ( response ) => response.body )
				.then( testForErrorReturned )
				.then( ( tasksListPage ) => dispatch( receiveTasksListPage( tasksListPage ) ) )
				// error handling
				.catch( error => dispatch( addError( error.message, 'Fetch tasks' ) ) );
		}
	};
}

export function moveToPage( page ) {
	return { type: CHANGE_VISIBLE_PAGE, payload: page };
}

function requestCreateTask() {
	return { type: REQUEST_ADD_TASK };
}

function receiveCreateTask( response ) {
	return { type: RECEIVE_ADD_TASK, payload: response };
}

export function createTask( task, createObjective ) {
	return function( dispatch ) {
		dispatch( requestCreateTask() );

		const taskPromise = superagent
			.post( Endpoints.ADD_TASK() )
			.set( ...EndpointAuth() )
			.send( task )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( doc => { 
				dispatch( receiveCreateTask( doc ) ); 
				return doc; 
			} );

		if ( createObjective ) {
			taskPromise
				.then( doc => dispatch( createObjectiveFromTask( doc ) ) );
		}

		taskPromise
			.then( doc => dispatch( addMessage( doc.title, 'Task created' ) ) )
			.then( () => dispatch( invalidateTasksList() ) )
			.then( () => dispatch( invalidateLatestActivity() ) )
			.then( () => dispatch( moveToPage( 1 ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Create task' ) ) );

		return taskPromise;
	};
}

export function createTaskAndObjective( task ) {
	return createTask( task, true );
}

export function invalidateTasksList() {
	return { type: INVALIDATE_TASKS_LIST };
}

function findTaskById( id, tasksByPage ) {
	const pages = Object.keys( tasksByPage );
	for ( var i = 0; i < pages.length; i++ ) {
		const p = pages[i];
		const tasks = tasksByPage[p];
		const task = tasks.filter( t => t._id === id );
		if ( task.length > 0 ) return task[0];
	}
	return null;
}

export function syncFetchTaskWithId( id, cb ) {
	return dispatch => {
		superagent
			.get( Endpoints.GET_TASK( id ) )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => cb( body.task ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Fetch invoice sync' ) ) );
	};
}