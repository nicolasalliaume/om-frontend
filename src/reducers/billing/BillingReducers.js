import { projectsBilling } from './ProjectsBillingReducer';
import update from 'immutability-helper';
import {
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	REQUEST_ADD_INVOICE,
	RECEIVE_ADD_INVOICE,
	INVALIDATE_PROJECTS_BILLING,
	REQUEST_UPDATE_INVOICE,
	RECEIVE_UPDATE_INVOICE
} from './../../actions/types';

export function billingView(state, action) {
	if (state === undefined) return {
		projectsBilling : projectsBilling()
	}

	switch (action.type) {
		case REQUEST_PROJECTS_BILLING:
		case RECEIVE_PROJECTS_BILLING:
		case INVALIDATE_PROJECTS_BILLING:
		case REQUEST_ADD_INVOICE:
		case RECEIVE_ADD_INVOICE:
		case REQUEST_UPDATE_INVOICE:
		case RECEIVE_UPDATE_INVOICE:
			return update(state, {
				projectsBilling: {
					$set: projectsBilling(state.projectsBilling, action)}
			})
		
		default: return state;
	}
}