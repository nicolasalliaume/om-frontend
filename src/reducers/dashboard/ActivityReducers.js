import update from 'immutability-helper';
import { 
	REQUEST_LATEST_ACTIVITY_LIST_PAGE,
	RECEIVE_LATEST_ACTIVITY_LIST_PAGE,
	INVALIDATE_LATEST_ACTIVITY
} from './../../actions/types';

export function latestActivity(state, action) {
	if (state === undefined) return {
		isFetching : false,
		didInvalidate : true,
		lastUpdated : null,

		currentVisiblePage : 1,
		cursor : null,
		
		// activity items indexed by page
		activityItemsByPage : activityItemsByPage()
	}

	switch (action.type) {
		case INVALIDATE_LATEST_ACTIVITY:
			return update(state, {didInvalidate: {$set : true}})
		case REQUEST_LATEST_ACTIVITY_LIST_PAGE:
			return update(state, {isFetching: {$set: true}})
		case RECEIVE_LATEST_ACTIVITY_LIST_PAGE:
			const { cursor } = action.payload;
			return update(state, {
				isFetching 			: {$set: false},
				didInvalidate		: {$set: false},
				lastUpdated			: {$set: new Date()},
				cursor 				: {$set: cursor},
				activityItemsByPage	: {$set: activityItemsByPage(state.activityItemsByPage, action)}
			})
		default: return state
	}
}

function activityItemsByPage(state, action) {
	if (state === undefined) return { };

	switch (action.type) {
		case RECEIVE_LATEST_ACTIVITY_LIST_PAGE:
			const { cursor, activity } = action.payload;
			const page = parseInt(cursor.current_page);
			return update(state, {[page]: {$set: activity}})
		default: 
			return state;
	}
}