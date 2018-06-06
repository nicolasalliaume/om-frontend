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
			visibleYear: moment.utc().startOf('year').format('YYYY-MM-DD')
		}
	}

	switch (action.type) {
		case OVERVIEW_SET_VISIBLE_DATE:
			return update(state, { visibleYear: {$set: action.payload} })

		default: return state;
	}
}

export function monthlyOverview(state, action) {
	if (state === undefined) {
		return {
			isFetching: false, 
			didInvalidate: true,
			invoices: [],
		}
	}

	switch (action.type) {
		case REQUEST_MONTHLY_OVERVIEW:
			return update(state, {
				isFetching: {$set: true},
			})

		case RECEIVE_MONTHLY_OVERVIEW:
			return update(state, {
				isFetching: {$set: false},
				didInvalidate: {$set: false},
				invoices: {$set: action.payload}
			})

		case INVALIDATE_MONTHLY_OVERVIEW:
		case RECEIVE_ADD_INVOICE:
		case RECEIVE_UPDATE_INVOICE:
		case RECEIVE_DELETE_INVOICE:
			return update(state, { didInvalidate: {$set: true} })

		default: return state;
	}
}