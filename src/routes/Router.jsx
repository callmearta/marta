import React from 'react';
import {
  Route, Switch, Redirect, HashRouter as ReactRouter,
} from 'react-router-dom';

import Routes from './routes';
import Header from '../ui/Header';
import Player from '../ui/Player';
import Sidebar from '../ui/Sidebar';

const Router = () => (
  <ReactRouter>
    <div className="app">
      <Sidebar />
      <div className="page">
        <Header />
        <Switch>
          {Routes.map((Page) => (
            <Route
              key={Page.path}
              exact={!!Page.exact}
              path={Page.path}
              component={({ match: { params } }) => (
                <Page.Component
                  key={
                    params.id
                    || params.query
                    || params.region
                  }
                />
              )}
            />
          ))}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
        <Player />
      </div>
    </div>
  </ReactRouter>
);

export default Router;
