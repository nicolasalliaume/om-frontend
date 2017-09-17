import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import store from './store';
import './utils';

if (process.env.NODE_ENV === 'production') {
	localStorage.setItem('currentUser',	"59b8357297831382f5945a77");
	localStorage.setItem('om-auth-token', 'c29tZXVzZXJuYW1l:c29tZXB3ZA==');
} else {
	localStorage.setItem('currentUser',	"59b5703bb4cbe91469de7e9f");
	localStorage.setItem('om-auth-token', 'c29tZXVzZXJuYW1l:c29tZXB3ZA==');
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
