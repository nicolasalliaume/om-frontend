import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';
import { addError, addMessage } from './messages';
import { invalidateLatestActivity } from './activity';
import { 
	REQUEST_GET_INTEGRATIONS,
	RECEIVE_GET_INTEGRATIONS,
	REQUEST_UPDATE_INTEGRATION,
	RECEIVE_UPDATE_INTEGRATION,
	INVALIDATE_INTEGRATIONS_LIST,
	REQUEST_DELETE_INTEGRATION,
	RECEIVE_DELETE_INTEGRATION,
	REQUEST_CREATE_INTEGRATION,
	RECEIVE_CREATE_INTEGRATION
} from './types';


function invalidateIntegrationsList() {
	return { type : INVALIDATE_INTEGRATIONS_LIST }
}

function requestGetIntegrations() {
	return { type : REQUEST_GET_INTEGRATIONS }
}

function receiveGetIntegrations(integrations) {
	return { type : RECEIVE_GET_INTEGRATIONS, payload : integrations }
}

function fetchIntegrations() {
	return function(dispatch) {
		dispatch(requestGetIntegrations());
		superagent
			.get(Endpoints.GET_INTEGRATIONS())
			.set(...EndpointAuth())
			.then(response => response.body.integrations)
			.then(integrations => dispatch(receiveGetIntegrations(integrations)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Fetch integrations')));
	}
}

function shouldFetchIntegrations(state) {
	// already fetching. don't fetch
	if (state.isFetching) return false;
	// fetch if date is different or we've invalidated
	return state.didInvalidate;
}

export function fetchIntegrationsIfNeeded() {
	return function(dispatch, getState) {
		if (shouldFetchIntegrations(getState().integrations)) {
			return dispatch(fetchIntegrations());
		}
	}
}

function requestCreateIntegration(integration) {
	return { type : REQUEST_CREATE_INTEGRATION, payload : integration }
}

function receiveCreateIntegration(integration) {
	return { type : RECEIVE_CREATE_INTEGRATION, payload : integration }
}

export function createIntegration(integration) {
	return function(dispatch) {
		dispatch(requestCreateIntegration(integration));
		superagent
			.post(Endpoints.CREATE_INTEGRATION())
			.set(...EndpointAuth())
			.send(integration)
			.then(response => response.body)
			.then(body => dispatch(receiveCreateIntegration(body)))
			.then(() => dispatch(invalidateIntegrationsList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(addMessage(integration.name, 'Integration created')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Create integration')));
	}
}

function requestUpdateIntegration(integrationId) {
	return { type : REQUEST_UPDATE_INTEGRATION, payload : integrationId }
}

function receiveUpdateIntegration(integration) {
	return { type : RECEIVE_UPDATE_INTEGRATION, payload : integration }
}

export function updateIntegration(integrationId, update) {
	return function(dispatch, getState) {
		const name = update.name; // assuming name is here
		dispatch(requestUpdateIntegration(integrationId));
		superagent
			.post(Endpoints.UPDATE_INTEGRATION(integrationId))
			.set(...EndpointAuth())
			.send(update)
			.then(response => response.body)
			.then(body => dispatch(receiveUpdateIntegration(body)))
			.then(() => dispatch(invalidateIntegrationsList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(addMessage(name, 'Integration updated')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Update integration')));
	}
}

function requestDeleteIntegration(integrationId) {
	return { type : REQUEST_DELETE_INTEGRATION, payload : integrationId }
}

function receiveDeleteIntegration(integrationId) {
	return { type : RECEIVE_DELETE_INTEGRATION, payload : integrationId }
}

export function deleteIntegration(integrationId) {
	return function(dispatch, getState) {
		const integration = getIntegrationById(integrationId, getState());
		dispatch(requestDeleteIntegration(integrationId));
		superagent
			.delete(Endpoints.DELETE_INTEGRATION(integrationId))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(body => dispatch(receiveDeleteIntegration(integrationId)))
			.then(() => dispatch(invalidateIntegrationsList()))
			.then(() => dispatch(invalidateLatestActivity()))
			.then(() => dispatch(addMessage(integration.name, 'Integration deleted')))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Delete integration')));
	}
}

function getIntegrationById(integrationId, state) {
	const integrations = state.integrations.integrationsList;
	for (var i = 0; i < integrations.length; i++) {
		if (integrations[i]._id === integrationId)
			return integrations[i];
	}
}
