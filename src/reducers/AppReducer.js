import { combineReducers } from 'redux';
import { dashboardView } from './dashboard/DashboardReducers';
import { currentUser } from './user/UserReducers';
import { tasksView } from './dashboard/TasksReducers';
import { cache } from './cache/CacheReducers';

const AppReducer = combineReducers({
	dashboardView,
	tasksView,
	currentUser,
	cache
})

export default AppReducer;