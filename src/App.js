import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import store from './store';
import './utils';

if (process.env.NODE_ENV === 'production') {
	localStorage.setItem('currentUser',	{
		"_id" : "59b8357297831382f5945a77",
		"username" : "nico",
		"first_name" : "nico",
		"last_name" : "nico",
		"email" : "nico@on-lab.com",
		"slack_account" : "nico",
		"trello_account" : "nico"
	})
} else {
	localStorage.setItem('currentUser',	{
		"_id" : "59b8357297831382f5945a77",
		"username" : "nico",
		"first_name" : "nico",
		"last_name" : "nico",
		"email" : "nico@on-lab.com",
		"slack_account" : "nico",
		"trello_account" : "nico"
	})
}

class App extends Component {
  render() {
	return (
		<Provider store={store}>
		  <BrowserRouter>
			<Layout />
		  </BrowserRouter>
		</Provider>
	)
  }
}

export default App;
