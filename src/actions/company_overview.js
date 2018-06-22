import {  OVERVIEW_SET_VISIBLE_DATE } from './types';

export function setCompanyOverviewVisibleDate(momentDate) {
	return { type: OVERVIEW_SET_VISIBLE_DATE, payload: momentDate }
}