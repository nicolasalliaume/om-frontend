import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './reducers/AppReducer';

import { fetchObjectivesForDateIfNeeded } from './actions/objectives';
import moment from 'moment';

const loggerMiddleware = createLogger();

// use redux-dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(AppReducer, 
	composeEnhancers(
		applyMiddleware(
			thunkMiddleware, // lets us dispatch() functions
			loggerMiddleware // neat middleware that logs actions
		)
	)
);

export default Store;