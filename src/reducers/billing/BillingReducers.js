import { projectsBilling } from './ProjectsBillingReducer';
import update from 'immutability-helper';
import {
	REQUEST_PROJECTS_BILLING,
	RECEIVE_PROJECTS_BILLING,
	REQUEST_ADD_INVOICE,
	RECEIVE_ADD_INVOICE,
	INVALIDATE_PROJECTS_BILLING,
	REQUEST_UPDATE_INVOICE,
	RECEIVE_UPDATE_INVOICE,
	REQUEST_INVOICES_LIST,
	RECEIVE_INVOICES_LIST,
	INVALIDATE_INVOICES_LIST
} from './../../actions/types';

export function billingView(state, action) {
	if (state === undefined) return {
		projectsBilling : projectsBilling(),
		invoicesList : {
			didInvalidate : true,
			isFetching : false,
			invoices : []
		}
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

		case INVALIDATE_INVOICES_LIST:
			return update(state, {
				invoicesList: {didInvalidate: {$set: true}}
			})

		case REQUEST_INVOICES_LIST:
			return update(state, {
				invoicesList: {isFetching: {$set: true}}
			})

		case RECEIVE_INVOICES_LIST:
			return update(state, {
				invoicesList: {
					isFetching: {$set: false},
					didInvalidate: {$set: false},
					invoices: {$set: action.payload}
				}
			})
		
		default: return state;
	}
}