import React from 'react';
import { Provider } from 'react-redux';
import Router from './routes/Router';
import store from './state/store';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
