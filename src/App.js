import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import Layout from './pages/Layout';
import store from './store';
import './utils';

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
