import superagent from 'superagent';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import { addError } from './messages';
import { REQUEST_GET_PLANNING_OBJECT, RECEIVE_GET_PLANNING_OBJECT } from './types';

function requestGetObject( name ) {
	return { type : REQUEST_GET_PLANNING_OBJECT, payload: name };
}

function receiveGetObject( object ) {
	return { type : RECEIVE_GET_PLANNING_OBJECT, payload: object };
}

function fetchObject( name ) {
	return dispatch => {
		dispatch( requestGetObject( name ) );
		superagent
			.get( Endpoints.GET_PLANNING_OBJECT( name ) )
			.set( ...EndpointAuth() )
			.then( response => response.body )
			.then( testForErrorReturned )
			.then( body => body.object )
			.then( object => dispatch( receiveGetObject( object ) ) )
			// error handling
			.catch( error => dispatch( addError( error.message, 'Fetch planning object' ) ) );
	};
}

function shouldFetchYearObjectve( state, year ) {
	return !state.isFetching && state.objectivesByYear[ year ] === undefined;
}

export function fetchYearObjectiveIfNeeded( year ) {
	return ( dispatch, getState ) => {
		if ( shouldFetchYearObjectve( getState().planning, year ) ) {
			return dispatch( fetchObject( `yo_${ year }` ) );
		}
	};
}