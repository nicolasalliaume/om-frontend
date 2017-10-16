import { 
	REQUEST_QUERY_OBJECTIVES,
	RECEIVE_QUERY_OBJECTIVES,
	PROJECT_DASHBOARD_SET_VISIBLE_PROJECT,
	INVALIDATE_PROJECT_DASHBOARD
} from './../../actions/types';

import update from 'immutability-helper';


export function projectDashboardView(state, action) {
	if (state === undefined) return {
		visibleProject 	: null, 
		objectives 		: objectives()
	}

	switch (action.type) {
		case REQUEST_QUERY_OBJECTIVES:
		case RECEIVE_QUERY_OBJECTIVES:
		case INVALIDATE_PROJECT_DASHBOARD:
			return update(state, {objectives: {$set: objectives(state.objectives, action)}})
		
		case PROJECT_DASHBOARD_SET_VISIBLE_PROJECT:
			return update(state, {visibleProject: {$set: action.payload}})

		default:
			return state;
	}
}

function objectives(state, action) {
	if (state === undefined) return {
		archived: {
			isFetching 		: false,
			didInvalidate	: true,
			list 			: []
		},
		active: {
			isFetching 		: false,
			didInvalidate	: true,
			list 			: []
		}
	}

	switch (action.type) {
		case RECEIVE_QUERY_OBJECTIVES: {
			const { objectives, collection } = action.payload;
			return update(state, { [collection] : {
				didInvalidate: {$set: false},
				isFetching: {$set: false},
				list: {$set: objectives}
			}})
		}

		case REQUEST_QUERY_OBJECTIVES: {
			const { collection } = action.payload;
			return update(state, { [collection] : {isFetching: {$set: true}}})
		}

		case INVALIDATE_PROJECT_DASHBOARD:
			return update(state, { 
				archived: {didInvalidate: {$set: true}},
				active: {didInvalidate: {$set: true}}
			})

		default: 
			return state;
	}
}
