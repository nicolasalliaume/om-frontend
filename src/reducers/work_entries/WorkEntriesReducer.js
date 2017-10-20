import update from 'immutability-helper';
import { 
	REQUEST_OBJECTIVE_WORK_ENTRIES,
	RECEIVE_OBJECTIVE_WORK_ENTRIES,
	INVALIDATE_OBJECTIVE_WORK_ENTRIES
} from './../../actions/types';

export function work_entries(state, action) {
	if (state === undefined) return {};

	switch (action.type) {
		case REQUEST_OBJECTIVE_WORK_ENTRIES: {
			const objectiveId = action.payload;
			// first time
			if (!state[objectiveId]) {
				return update(state, {$set: { 
					[objectiveId] : { 
						entries: [],
						didInvalidate: false,
						isFetching: true
					}
				}});
			}
			// not first time
			return update(state, { [objectiveId] : {$set: { isFetching: true }} });
		}

		case RECEIVE_OBJECTIVE_WORK_ENTRIES: {
			const { objectiveId, workEntries } = action.payload;
			return update(state, { 
				[objectiveId] : {
					entries: {$set: workEntries},
					didInvalidate: {$set: false},
					isFetching: {$set: false}
				}
			});
		}

		case INVALIDATE_OBJECTIVE_WORK_ENTRIES: {
			const objectiveId = action.payload;
			return update(state, { [objectiveId] : {didInvalidate: {$set: true}} });
		}

		default:
			return state;
	}
}