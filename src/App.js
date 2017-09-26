import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import store from './store';

import Login from './pages/Login';
import Layout from './pages/Layout';
import './utils';

localStorage.removeItem('currentUser');
localStorage.removeItem('om-auth-token');

/* momentjs config */
moment.locale('en', {
	relativeTime: {
	  future: 'in %s',
	  past: '%s',
	  s:  '1s',
	  ss: '%ss',
	  m:  '1m',
	  mm: '%dm',
	  h:  '1h',
	  hh: '%dh',
	  d:  '1d',
	  dd: '%dd',
	  M:  '1 month',
	  MM: '%d months',
	  y:  '1y',
	  yy: '%dy'
	}
});


export default class App extends Component {
  render() {
	return (
		<Provider store={store}>
			<HashRouter>
			  	<Switch>
			  		<Route path='/login/:userId?/:authToken?' component={Login} />
			  		<Route path='/' render={this.renderLayoutIfUserLoggedIn} />
			  	</Switch>
			</HashRouter>
		</Provider>
	)
  }

  renderLayoutIfUserLoggedIn() {
  	return store.getState().currentUser !== null ? <Layout /> : <Redirect to="/login" />
  }
}
