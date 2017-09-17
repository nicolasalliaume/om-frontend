import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppReducer from './reducers/AppReducer';

import { fetchObjectivesForDateIfNeeded } from './actions/objectives';
import moment from 'moment';

const loggerMiddleware = createLogger();

// use redux-dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = [ 
	thunkMiddleware // lets us dispatch() functions
]
if (process.env.NODE_ENV !== 'production') {
  middleware = [ ...middleware, loggerMiddleware ] // dev logging middleware
}

const Store = createStore(AppReducer, 
	composeEnhancers(
		applyMiddleware(...middleware)
	)
);

export default Store;