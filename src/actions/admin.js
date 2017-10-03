import superagent from 'superagent';
import { Endpoints, EndpointAuth } from './endpoints';
import { addError } from './messages';
import { 
	REQUEST_GET_INTEGRATIONS,
	RECEIVE_GET_INTEGRATIONS
} from './types';


function requestGetIntegrations() {
	return { type : REQUEST_GET_INTEGRATIONS }
}

function receiveGetIntegrations(integrations) {
	return { type : RECEIVE_GET_INTEGRATIONS, payload : integrations }
}

export function fetchIntegrations() {
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