import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as ReactRouter } from 'react-router-dom';
import Routes from './routes';

const Router = () => {
    return (
        <ReactRouter>
            <Switch>
                {Routes.map((Page, i) =>
                    <Route key={i} exact={!!Page.exact} path={Page.path} component={() => <Page.component />} />
                )}
                <Route component={() => <Redirect to="/" />} />
            </Switch>
        </ReactRouter>
    )
};

export default Router;
