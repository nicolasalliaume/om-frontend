import { 
	OVERVIEW_SET_VISIBLE_DATE,
	REQUEST_MONTHLY_OVERVIEW,
	RECEIVE_MONTHLY_OVERVIEW,
	INVALIDATE_MONTHLY_OVERVIEW
} from './types';
import moment from 'moment';
import { Endpoints, EndpointAuth, testForErrorReturned } from './endpoints';
import superagent from 'superagent';
import { addError } from './messages';

export function setCompanyOverviewVisibleDate(momentDate) {
	return { type: OVERVIEW_SET_VISIBLE_DATE, payload: momentDate }
}

function shouldFetchMontlyOverview(state) {
	return !state.isFetching && state.didInvalidate;
}

function requestMonthlyOverview() {
	return { type: REQUEST_MONTHLY_OVERVIEW }
}

function receiveMonthlyOverview(body) {
	return { type: RECEIVE_MONTHLY_OVERVIEW, payload: body.invoices }
}

export function fetchMonthlyOverviewInvoicesIfNeeded(year, month) {
	return function(dispatch, getState) {
		if (!shouldFetchMontlyOverview(getState().monthlyOverview)) return;
		dispatch(requestMonthlyOverview());
		const query = getInvoiceFilterForMonth(year, month);
		return superagent
			.get(Endpoints.GET_INVOICES_WITH_QUERY(query))
			.set(...EndpointAuth())
			.then(response => response.body)
			.then(testForErrorReturned)
			.then(body => dispatch(receiveMonthlyOverview(body)))
			// error handling
			.catch(error => dispatch(addError(error.message, 'Montly Overview')));
	}
}

function getInvoiceFilterForMonth(year, month) {
	const som = moment(`${year}-${month}-01`);
	const eom = som.clone().endOf('month');
	return { invoicing_date: { $lte: eom.format('YYYY-MM-DD'), $gte: som.format('YYYY-MM-DD') } };
}

export function invalidateMonthlyOverview() {
	return { type: INVALIDATE_MONTHLY_OVERVIEW }
}