import { combineReducers } from 'redux';
import { dashboardView } from './dashboard/DashboardReducers';
import { currentUser } from './user/UserReducers';
import { tasksView } from './dashboard/TasksReducers';

const AppReducer = combineReducers({
	dashboardView,
	tasksView,
	currentUser
})

export default AppReducer;