import React from 'react';
import { Route, Switch, Redirect, HashRouter as ReactRouter } from 'react-router-dom';

import Routes from './routes';
import Header from '../ui/header';
import Player from '../ui/player';
import Sidebar from '../ui/sidebar';

const Router = () => {
    return (
        <ReactRouter>
            <div className="app">
                <Sidebar />
                <div className="page">
                    <Header />
                    <Switch>
                        {Routes.map((Page, i) =>
                            <Route key={i} exact={!!Page.exact} path={Page.path} component={(props, index) =>
                                <Page.component key={props.match.params.id || props.match.params.query || props.match.params.region} />
                            } />
                        )}
                        <Route component={() => <Redirect to="/" />} />
                    </Switch>
                    <Player />
                </div>
            </div>
        </ReactRouter>
    )
};

export default Router;
