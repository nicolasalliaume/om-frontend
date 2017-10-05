import { 
	INVALIDATE_OBJECTIVES_LIST,
	REQUEST_DATE_OBJECTIVES,
	RECEIVE_DATE_OBJECTIVES,
	RECEIVE_UPDATE_OBJECTIVE,
	REQUEST_OBJECTIVES_SUMMARY,
	RECEIVE_OBJECTIVES_SUMMARY,
	DASHBOARD_SET_VISIBLE_DATE,
	INVALIDATE_OBJECTIVES_SUMMARY
} from './../../actions/types';

import update from 'immutability-helper';


export function objectivesSummary(state, action) {
	if (state === undefined) return {
		didInvalidate: true,
		lastUpdated: null,
		isFetching: false,
		summary: {
			everyone: { completed: 0, count: 0 },
			user: { completed: 0, count: 0 }
		}
	}

	switch (action.type) {
		case REQUEST_OBJECTIVES_SUMMARY:
			return update(state, {isFetching: {$set: true}});
		case RECEIVE_OBJECTIVES_SUMMARY:
			return update(state, {
				isFetching: {$set: false},
				didInvalidate: {$set: false},
				lastUpdated: {$set: new Date()},
				summary: {$set: action.payload.summary}
			});
		case INVALIDATE_OBJECTIVES_SUMMARY:
			return update(state, {didInvalidate: {$set: true}});
		default:
			return state;
	}
}

export function objectivesList(state, action) {
	if (state === undefined) return {
		isFetching 		: false,
		didInvalidate 	: true,
		lastUpdated 	: null,
		// the actual items, organized by level (day, month, year)
		objectivesByLevel : {
			day : [], month : [], year : []
		}
	};

	switch (action.type) {
		case INVALIDATE_OBJECTIVES_LIST:
		case DASHBOARD_SET_VISIBLE_DATE:
			return update(state, {didInvalidate : {$set : true}})

		case REQUEST_DATE_OBJECTIVES:
			return update(state, {isFetching : {$set : true}})

		case RECEIVE_DATE_OBJECTIVES:
			// fill in empty fields (for example when there're no day
			// objectives)
			const objectivesByLevel = Object.assign(
				{day: [],month: [],year: []}, action.payload.objectives);
			return update(state, {
				isFetching: {$set : false}, 
				didInvalidate: {$set: false},
				lastUpdated: {$set: Date.now()},
				objectivesByLevel : {$set : objectivesByLevel}
			});
		default: return state;
	}
}
