import React from 'react';
import Router from './routes/router';

import './App.scss';
import store from './state/store';
import { Provider } from 'react-redux';

function App() {
  return <Provider store={store}>
    <Router />
  </Provider>
}

export default App;
