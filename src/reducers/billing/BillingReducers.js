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
	INVALIDATE_INVOICES_LIST,
	RECEIVE_DELETE_INVOICE,
	REQUEST_SEND_PAYPAL_INVOICE,
	RECEIVE_SEND_PAYPAL_INVOICE,
	ERROR_SEND_PAYPAL_INVOICE,
} from './../../actions/types';


const initialState = {
	// projects with invoices and variables
	projectsBilling : projectsBilling(),
	// list of invoices, not organized
	invoicesList : {
		didInvalidate 	: true,
		isFetching 		: false,
		isSending 		: false,
		invoices 		: [],
	}
};


export function billingView( state = initialState, action ) {
	switch ( action.type ) {

	case REQUEST_PROJECTS_BILLING:
	case RECEIVE_PROJECTS_BILLING:
	case INVALIDATE_PROJECTS_BILLING:
	case REQUEST_ADD_INVOICE:
	case REQUEST_UPDATE_INVOICE:
		return update( state, {
			projectsBilling: {
				$set: projectsBilling( state.projectsBilling, action ) }
		} );

	case RECEIVE_ADD_INVOICE:
	case RECEIVE_UPDATE_INVOICE:
	case RECEIVE_DELETE_INVOICE:
		return update( state, {
			invoicesList: { didInvalidate: { $set: true } },
			projectsBilling: {
				$set: projectsBilling( state.projectsBilling, action ) }
		} );

	case INVALIDATE_INVOICES_LIST:
		return update( state, {
			invoicesList: { didInvalidate: { $set: true } }
		} );

	case REQUEST_INVOICES_LIST:
		return update( state, {
			invoicesList: { isFetching: { $set: true } }
		} );

	case RECEIVE_INVOICES_LIST:
		return update( state, {
			invoicesList: {
				isFetching: { $set: false },
				didInvalidate: { $set: false },
				invoices: { $set: action.payload }
			}
		} );

	case REQUEST_SEND_PAYPAL_INVOICE:
		return update( state, {
			invoicesList: {
				isSending: { $set: true },
			}
		} );
		
	case RECEIVE_SEND_PAYPAL_INVOICE:
	case ERROR_SEND_PAYPAL_INVOICE:
		return update( state, {
			invoicesList: {
				isSending: { $set: false },
			}
		} );
		
	default: return state;
	}
}
