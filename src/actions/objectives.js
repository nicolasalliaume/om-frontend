import { 
	REQUEST_ADD_OBJECTIVE, 
	RECEIVE_ADD_OBJECTIVE,
	INVALIDATE_OBJECTIVES_LIST,
	REQUEST_DATE_OBJECTIVES,
	RECEIVE_DATE_OBJECTIVES,
	REQUEST_UPDATE_OBJECTIVE,
	RECEIVE_UPDATE_OBJECTIVE,
	REQUEST_DELETE_OBJECTIVE,
	RECEIVE_DELETE_OBJECTIVE,
	REQUEST_OBJECTIVES_SUMMARY,
	RECEIVE_OBJECTIVES_SUMMARY,
	INVALIDATE_OBJECTIVES_SUMMARY,
} from './types';

import { invalidateLatestActivity } from './activity';
import { addMessage, addError } from './messages';
import superagent from 'superagent';
import moment from 'moment';
import { Endpoints, EndpointAuth } from './endpoints';


export function invalidateObjectivesSummary() {
	return { type: INVALIDATE_OBJECTIVES_SUMMARY }
}

function requestObjectivesSummary() {
	return { type: REQUEST_OBJECTIVES_SUMMARY }
}

function receiveObjectivesSummary(result) {
	return { type : RECEIVE_OBJECTIVES_SUMMARY, payload: result }
}

function fetchObjectivesSummaryForDate(date) {
	const [day, month, year] = moment.utc(date).format('DD/MM/YYYY').split('/');
	return function(dispatch) {
		dispatch(requestObjectivesSummary());
		superagent
			.get(Endpoints.GET_OBJECTIVES_SUMMARY(year, month, day))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(body => dispatch(receiveObjectivesSummary(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Objectives summary')));
	}
}

function shouldFetchObjectivesSummaryForDate(state, date) {
	// already fetching. don't fetch
	if (state.objectivesSummary.isFetching) return false;
	// fetch if date is different or we've invalidated
	return isDateDifferent(state.visibleDate, date)
		|| state.objectivesSummary.didInvalidate;
}

export function fetchObjectivesSummaryForDateIfNeeded(date) {
	return function(dispatch, getState) {
		// fetch only if we need to (date change, invalidated, ...)
		if (shouldFetchObjectivesSummaryForDate(getState().dashboardView, date)) {
			return dispatch(fetchObjectivesSummaryForDate(date));
		}
	}
}

function requestUpdateObjective(objectiveId) {
	return { type: REQUEST_UPDATE_OBJECTIVE, payload: objectiveId }
}

function receiveUpdateObjective(result, objectiveId) {
	return { type : RECEIVE_UPDATE_OBJECTIVE, payload: result, metadata : { objectiveId } }
}

export function updateObjective(objectiveId, update) {
	return function(dispatch) {
		dispatch(requestUpdateObjective(objectiveId));
		superagent
			.post(Endpoints.UPDATE_OBJECTIVE(objectiveId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(body => dispatch(receiveUpdateObjective(body, objectiveId)))
			.then(() => dispatch(invalidateObjectivesList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(invalidateObjectivesSummary()))
			.then(() => dispatch(addMessage('', 'Objective updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update objective')));
	}
}

function requestDeleteObjective(objectiveId) {
	return { type: REQUEST_DELETE_OBJECTIVE, payload: objectiveId }
}

function receiveDeleteObjective(objectiveId) {
	return { type: RECEIVE_DELETE_OBJECTIVE, payload: objectiveId }
}

export function deleteObjective(objectiveId) {
	return function(dispatch) {
		dispatch(requestDeleteObjective(objectiveId));
		superagent
			.delete(Endpoints.DELETE_OBJECTIVE(objectiveId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(body => dispatch(receiveDeleteObjective(objectiveId)))
			.then(() => dispatch(invalidateObjectivesList()))
			.then(() => dispatch(invalidateObjectivesSummary()))
			.then(() => dispatch(addMessage('', 'Objective deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete objective')));
	}
}

function requestCreateObjective(objective) {
	return { type: REQUEST_ADD_OBJECTIVE }
}

export function createObjectiveFromTask(task) {
	const objective = {
		related_task 	: task._id,
		level 			: 'day',
		owners 			: [localStorage.getItem('currentUser')],
		objective_date 	: Date.now(),
		created_by 		: localStorage.getItem('currentUser')
	}
	return createObjective(objective);
}

export function createObjective(objective) {
	return function(dispatch) {
		dispatch(requestCreateObjective(objective));

		return superagent
			.post(Endpoints.CREATE_OBJECTIVE())
			.set(...EndpointAuth())
			.send(objective)
			.then((response) => {
				return response.body;
			})
			.then((doc) => { dispatch(invalidateObjectivesList()); return doc; })
			.then((doc) => { dispatch(receiveAddObjective(doc)); return doc; })
			.then((doc) => dispatch(addMessage(doc.title, 'Objective added')))
			.then(() => dispatch(invalidateObjectivesList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(invalidateObjectivesSummary()))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Create objective')));
	}
}

export function invalidateObjectivesList() {
	return { type: INVALIDATE_OBJECTIVES_LIST}
}

function requestObjectivesForDate(date) {
	return { type: REQUEST_DATE_OBJECTIVES }
}

function receiveAddObjective(result) {
	return { type: RECEIVE_ADD_OBJECTIVE }
}

function receiveObjectivesForDate(date, data) {
	return {
		type 	: RECEIVE_DATE_OBJECTIVES,
		payload : data
	}
}

function fetchObjectivesForDate(date) {
	const [day, month, year] = moment.utc(date).format('DD/MM/YYYY').split('/');
	// async action. returning function
	return function(dispatch) {
		// First dispatch: the app state is updated to inform
    	// that the API call is starting.
		dispatch(requestObjectivesForDate(date));
		// The function called by the thunk middleware can return a value,
    	// that is passed on as the return value of the dispatch method.
    	return superagent
    		.get(Endpoints.GET_DATE_OBJECTIVES(year, month, day))
    		.set(...EndpointAuth())
    		.then((response) => {
    			return response.body;
    		})
    		.then((body) => dispatch(receiveObjectivesForDate(date, body)))
    		// error handling
			.catch(error => dispatch(addError(error.message, 'Fetch objectives')));
	}
}

function isDateDifferent(d1, d2) {
	return moment(d1).format('DD/MM/YYYY') !== moment(d2).format('DD/MM/YYYY');
}

function shouldFetchObjectivesForDate(state, date) {
	// already fetching. don't fetch
	if (state.objectivesList.isFetching) return false;
	// fetch if date is different or we've invalidated
	return isDateDifferent(state.visibleDate, date)
		|| state.objectivesList.didInvalidate;
}

export function fetchObjectivesForDateIfNeeded(date) {
	return function(dispatch, getState) {
		// fetch only if we need to (date change, invalidated, ...)
		if (shouldFetchObjectivesForDate(getState().dashboardView, date)) {
			return dispatch(fetchObjectivesForDate(date));
		}
	}
}

export function scratchObjective(objectiveId) {
	return function(dispatch) {
		dispatch(updateObjective(objectiveId, { 
			scratched 	 : true, 
			scratched_by : localStorage.getItem('currentUser'),
			scratched_ts : Date.now() 
		}))
	}
}

export function unscratchObjective(objectiveId) {
	return function(dispatch) {
		dispatch(updateObjective(objectiveId, { 
			scratched 	 : false, 
			scratched_by : null,
			scratched_ts : null 
		}))
	}
}

export function completeObjective(objectiveId) {
	return function(dispatch) {
		dispatch(updateObjective(objectiveId, { 
			progress 	 : 1, 
			completed_by : localStorage.getItem('currentUser'),
			completed_ts : Date.now()
		}))
	}
}

export function setObjectiveProgress(objectiveId, progress) {
	return function(dispatch) {
		if (progress === 1) {
			dispatch(completeObjective(objectiveId));
		} else {
			dispatch(updateObjective(objectiveId, { progress }))
		}
	}
}

