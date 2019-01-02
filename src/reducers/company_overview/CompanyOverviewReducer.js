import moment from 'moment';
import update from 'immutability-helper';
import { OVERVIEW_SET_VISIBLE_DATE } from '../../actions/types';

export function companyOverview( state, action ) {
	if ( state === undefined ) {
		return {
			visibleYear: moment.utc().startOf( 'year' ).format( 'YYYY' )
		};
	}

	switch ( action.type ) {
	case OVERVIEW_SET_VISIBLE_DATE:
		return update( state, { visibleYear: { $set: action.payload } } );

	default: return state;
	}
}