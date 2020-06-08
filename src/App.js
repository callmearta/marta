import React from 'react';
import Router from './routes/router';

import './App.scss';
import store from './state/store';
import { Provider } from 'react-redux';
import Header from './ui/header';
import Player from './ui/player';

function App() {
  return <Provider store={store}>
    <Header />
    <Router />
    <Player />
  </Provider>
}

export default App;
