import update from 'immutability-helper';
import { 
	REQUEST_OBJECTIVE_WORK_ENTRIES,
	RECEIVE_OBJECTIVE_WORK_ENTRIES
} from './../../actions/types';

export function work_entries(state, action) {
	if (state === undefined) return {};

	switch (action.type) {
		case RECEIVE_OBJECTIVE_WORK_ENTRIES:
			const { objectiveId, workEntries } = action.payload;
			return update(state, {$set: { [objectiveId] : workEntries}});
		default:
			return state;
	}
}