import { projectsBilling } from './ProjectsBillingReducer';
import update from 'immutability-helper';
import {
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING
} from './../../actions/types';

export function billingView(state, action) {
	if (state === undefined) return {
		projectsBilling : projectsBilling()
	}

	switch (action.type) {
		case REQUEST_PROJECTS_BILLING:
		case RECEIVE_PROJECTS_BILLING:
			return update(state, {
				projectsBilling: {
					$set: projectsBilling(state.projectsBilling, action)}
			})
		
		default: return state;
	}
}