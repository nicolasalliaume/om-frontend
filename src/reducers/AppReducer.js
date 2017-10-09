import { combineReducers } from 'redux';
import { dashboardView } from './dashboard/DashboardReducers';
import { currentUser } from './user/UserReducers';
import { messages } from './messages/MessagesReducer';
import { tasksView } from './tasks/TasksReducers';
import { cache } from './cache/CacheReducers';
import { work_entries } from './work_entries/WorkEntriesReducer';
import { integrations } from './admin/IntegrationsReducer';
import { billingView } from './billing/BillingReducers';

const AppReducer = combineReducers({
	dashboardView,
	tasksView,
	currentUser,
	cache,
	messages,
	work_entries,
	integrations,
	billingView
})

export default AppReducer;