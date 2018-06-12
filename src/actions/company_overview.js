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