import { combineReducers } from 'redux';
import { dashboardView } from './dashboard/DashboardReducers';
import { currentUser } from './user/UserReducers';
import { messages } from './messages/MessagesReducer';
import { tasksView } from './tasks/TasksReducers';
import { cache } from './cache/CacheReducers';

const AppReducer = combineReducers({
	dashboardView,
	tasksView,
	currentUser,
	cache,
	messages
})

export default AppReducer;