import update from 'immutability-helper';
import { REQUEST_GET_PLANNING_OBJECT, RECEIVE_GET_PLANNING_OBJECT } from '../../actions/types';

const initialState = {
	isFetching: false,
	objectivesByYear: {},	
};

export function planning( state = initialState, action ) {
	switch ( action.type ) {
	case REQUEST_GET_PLANNING_OBJECT:
		return update( state, { isFetching: { $set: true } } );
	
	case RECEIVE_GET_PLANNING_OBJECT: {
		const { object_name, object_value } = action.payload;
		const year = object_name.replace( 'yo_', '' );
		return update( state, { isFetching: { $set: false }, objectivesByYear: { [ year ]: { $set: parseInt( object_value ) } } } );
	}

	default: return state;
	}
}