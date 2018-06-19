import moment from 'moment';
import update from 'immutability-helper';
import { 
	OVERVIEW_SET_VISIBLE_DATE, 
	REQUEST_MONTHLY_OVERVIEW,
	RECEIVE_MONTHLY_OVERVIEW,
	INVALIDATE_MONTHLY_OVERVIEW,
	RECEIVE_ADD_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	RECEIVE_DELETE_INVOICE,
} from '../../actions/types';

export function companyOverview(state, action) {
	if (state === undefined) {
		return {
			visibleYear: moment.utc().startOf('year').format('YYYY')
		}
	}

	switch (action.type) {
		case OVERVIEW_SET_VISIBLE_DATE:
			return update(state, { visibleYear: {$set: action.payload} })

		default: return state;
	}
}