import React from 'react';
import {
  Route, Switch, Redirect, BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Home';
import Playlist from './Playlist';
import Playlists from './Playlists';
import Search from './Search';
import Artist from './Artist';
import Album from './Album';
import Header from '../components/Header';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import store from '../store';
import '../styles/App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="page">
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/region/:region" component={Home} exact />
              <Route path="/playlist/:id" component={Playlist} exact />
              <Route path="/playlists/:id'" component={Playlists} exact />
              <Route path="/artist/:id" component={Artist} exact />
              <Route path="/album/:id" component={Album} exact />
              <Route path="/search/:query" component={Search} exact />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
            <Player />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
