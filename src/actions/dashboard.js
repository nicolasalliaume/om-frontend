import { 
	DASHBOARD_SET_VISIBLE_DATE
} from './types';

export function setVisibleDate(date) {
	return {
		type 	: DASHBOARD_SET_VISIBLE_DATE,
		payload : date
	}
}