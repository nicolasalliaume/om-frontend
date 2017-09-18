import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Layout from './pages/Layout';
import store from './store';
import './utils';

localStorage.removeItem('currentUser');
localStorage.removeItem('om-auth-token');

class App extends Component {
  render() {
	return (
		<Provider store={store}>
			<BrowserRouter>
			  	<Switch>
			  		<Route exact path='/login/:userId/:authToken' component={Login} />
			  		<Route path='/' component={Layout} />
			  	</Switch>
			</BrowserRouter>
		</Provider>
	)
  }
}

export default App;
