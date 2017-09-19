import { 
	REMOVE_OBJECTIVE, 
	REQUEST_ADD_OBJECTIVE, 
	INVALIDATE_OBJECTIVES_LIST,
	REQUEST_DATE_OBJECTIVES,
	RECEIVE_DATE_OBJECTIVES,
	DASHBOARD_SET_VISIBLE_DATE,
	REQUEST_LATEST_ACTIVITY_LIST_PAGE,
	RECEIVE_LATEST_ACTIVITY_LIST_PAGE,
	INVALIDATE_LATEST_ACTIVITY,
	REQUEST_OBJECTIVES_SUMMARY,
	RECEIVE_OBJECTIVES_SUMMARY,
	INVALIDATE_OBJECTIVES_SUMMARY
} from './../../actions/types';

import update from 'immutability-helper';
import moment from 'moment';

import {
	objectivesSummary, 
	objectivesList
} from './ObjectivesReducers';
import { latestActivity } from './ActivityReducers';

/**
 * dashboard-view
 * everything related to the view of the dashboard
 */
export function dashboardView(state, action) {
	if (state === undefined) return {
		// the date that is currently visible.
		// this affects the list of objectives and the objectives
		// summary
		visibleDate : moment().startOf('day'),
		// the list of objectives for the day/month/year with 
		// metadata
		objectivesList : objectivesList(),
		// the summary of me and the company.
		// this is a cached calculation from the objectives
		objectivesSummary : objectivesSummary(),
		// latest activity to show.
		// this data is paged, so we're indexing
		// it by page number
		latestActivity : latestActivity()
	}

	switch (action.type) {
		case REMOVE_OBJECTIVE:
		case REQUEST_ADD_OBJECTIVE:
		case INVALIDATE_OBJECTIVES_LIST:
		case REQUEST_DATE_OBJECTIVES:
		case RECEIVE_DATE_OBJECTIVES:
			return update(state, {
				objectivesList : {
					$set : objectivesList(state.objectivesList, action)}
			});
		case DASHBOARD_SET_VISIBLE_DATE:
			return update(state, {
				visibleDate: {$set: action.payload},
				objectivesList : {$set : objectivesList(state.objectivesList, action)},
				objectivesSummary : {$set : objectivesSummary(state.objectivesSummary, action)}
			})
		case REQUEST_LATEST_ACTIVITY_LIST_PAGE:
		case RECEIVE_LATEST_ACTIVITY_LIST_PAGE:
		case INVALIDATE_LATEST_ACTIVITY:
			return update(state, {
				latestActivity: {$set: latestActivity(state.latestActivity, action)}})
		case REQUEST_OBJECTIVES_SUMMARY:
		case RECEIVE_OBJECTIVES_SUMMARY:
		case INVALIDATE_OBJECTIVES_SUMMARY:
			return update(state, {
				objectivesSummary: {$set: objectivesSummary(state.objectivesSummary, action)}
			})
		default: return state
	}
}
