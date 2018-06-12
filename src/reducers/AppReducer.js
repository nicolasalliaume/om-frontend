import { combineReducers } from 'redux';
import { dashboardView } from './dashboard/DashboardReducers';
import { currentUser } from './user/UserReducers';
import { messages } from './messages/MessagesReducer';
import { tasksView } from './tasks/TasksReducers';
import { cache } from './cache/CacheReducers';
import { work_entries } from './work_entries/WorkEntriesReducer';
import { integrations } from './admin/IntegrationsReducer';
import { alarms } from './admin/AlarmsReducer';
import { billingView } from './billing/BillingReducers';
import { projectDashboardView } from './project_dashboard/ProjectDashboardReducers';
import { companyOverview } from './company_overview/CompanyOverviewReducer';
import { SET_AFTER_LOGIN_REDIRECTION } from '../actions/types';

function loginMiddleware(state = { redirectTo: null }, action) {
	if (action.type === SET_AFTER_LOGIN_REDIRECTION) {
		return { redirectTo : action.payload }
	}
	return state;
}

const AppReducer = combineReducers({
	loginMiddleware,
	dashboardView,
	tasksView,
	currentUser,
	cache,
	messages,
	work_entries,
	integrations,
	alarms,
	billingView,
	projectDashboardView,
	companyOverview,
})

export default AppReducer;