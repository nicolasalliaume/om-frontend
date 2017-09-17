import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './reducers/AppReducer';

import { fetchObjectivesForDateIfNeeded } from './actions/objectives';
import moment from 'moment';

let Store;

if (process.env.NODE_ENV !== 'production') { 
	const reduxLogger = require('redux-logger');
	const loggerMiddleware = reduxLogger.createLogger();

	// use redux-dev tools
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	let middleware = [ 
		thunkMiddleware, // lets us dispatch() functions
		loggerMiddleware
	]

	Store = createStore(AppReducer, 
		composeEnhancers(applyMiddleware(...middleware))
	);
}
else {
	Store = createStore(AppReducer, applyMiddleware(thunkMiddleware));
}


export default Store;