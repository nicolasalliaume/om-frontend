import moment from 'moment';
import update from 'immutability-helper';
import { OVERVIEW_SET_VISIBLE_DATE } from '../../actions/types';

export function companyOverview(state, action) {
	if (state === undefined) {
		return {
			visibleYear: moment.utc().startOf('year').format('YYYY-MM-DD')
		}
	}

	switch (action.type) {
		case OVERVIEW_SET_VISIBLE_DATE:
			console.log("SETTING NEW DATE", action);
			return update(state, { visibleYear: {$set: action.payload} })

		default: return state;
	}
}