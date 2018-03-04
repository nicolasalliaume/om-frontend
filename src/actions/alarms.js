import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addError, addMessage } from './messages';
import { 
	REQUEST_GET_ALARMS,
	RECEIVE_GET_ALARMS,
	REQUEST_CREATE_ALARM,
	RECEIVE_CREATE_ALARM,
	REQUEST_UPDATE_ALARM,
	RECEIVE_UPDATE_ALARM,
	REQUEST_DELETE_ALARM,
	RECEIVE_DELETE_ALARM,
	INVALIDATE_ALARMS_LIST
} from './types';

function invalidateAlarmsList() {
	return { type : INVALIDATE_ALARMS_LIST }
}

function requestGetAlarms() {
	return { type : REQUEST_GET_ALARMS }
}

function receiveGetAlarms(alarms) {
	return { type : RECEIVE_GET_ALARMS, payload : alarms }
}

function fetchAlarms() {
	return function(dispatch) {
		dispatch(requestGetAlarms());
		superagent
			.get(Endpoints.GET_ALARMS())
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => body.alarms)
			.then(alarms => dispatch(receiveGetAlarms(alarms)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Fetch alarms')));
	}
}

function shouldFetchAlarms(state) {
	return state.didInvalidate && !state.isFetching;
}

export function fetchAlarmsIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchAlarms(getState().alarms)) {
			return dispatch(fetchAlarms());
		}
	}
}

function requestCreateAlarm(alarm) {
	return { type : REQUEST_CREATE_ALARM, payload : alarm }
}

function receiveCreateAlarm(alarm) {
	return { type : RECEIVE_CREATE_ALARM, payload : alarm }
}

export function createAlarm(alarm) {
	return function(dispatch) {
		dispatch(requestCreateAlarm(alarm));
		superagent
			.post(Endpoints.CREATE_ALARM())
			.set(...EndpointAuth())
			.send(alarm)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveCreateAlarm(body)))
			.then(() => dispatch(invalidateAlarmsList()))
			.then(() => dispatch(addMessage(alarm.name, 'Alarm created')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Create alarm')));
	}
}

function requestUpdateAlarm(alarmId) {
	return { type : REQUEST_UPDATE_ALARM, payload : alarmId }
}

function receiveUpdateAlarm(alarm) {
	return { type : RECEIVE_UPDATE_ALARM, payload : alarm }
}

export function updateAlarm(alarmId, update) {
	return function(dispatch, getState) {
		const name = update.name; // assuming name is here
		dispatch(requestUpdateAlarm(alarmId));
		superagent
			.post(Endpoints.UPDATE_ALARM(alarmId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveUpdateAlarm(body)))
			.then(() => dispatch(invalidateAlarmsList()))
			.then(() => dispatch(addMessage(name, 'Alarm updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update alarm')));
	}
}

function requestDeleteAlarm(alarmId) {
	return { type : REQUEST_DELETE_ALARM, payload : alarmId }
}

function receiveDeleteAlarm(alarmId) {
	return { type : RECEIVE_DELETE_ALARM, payload : alarmId }
}

export function deleteAlarm(alarmId) {
	return function(dispatch, getState) {
		const alarm = getAlarmById(alarmId, getState());
		dispatch(requestDeleteAlarm(alarmId));
		superagent
			.delete(Endpoints.DELETE_ALARM(alarmId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveDeleteAlarm(alarmId)))
			.then(() => dispatch(invalidateAlarmsList()))
			.then(() => dispatch(addMessage(alarm.name, 'Alarm deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete alarm')));
	}
}

function getAlarmById(alarmId, state) {
	const alarms = state.alarms.alarmsList;
	for (var i = 0; i < alarms.length; i++) {
		if (alarms[i]._id === alarmId)
			return alarms[i];
	}
}