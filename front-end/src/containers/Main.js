import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routes } from '../modules/_index'
import { Route, Switch, Redirect  } from 'react-router-dom'
import { Provider } from 'react-redux';

import * as reducers from '../store/reducers';

export const store = createStore(combineReducers(reducers), applyMiddleware(thunk));


const Main = () => {
    return (
        <main className="viewport">
            <Provider store={store}>
                <Switch>
                    {
                        routes.map((item) => {
                            return <Route key={'Route_' + item.path} exact path={item.path} component={item.component}/>
                        })
                    }
                    <Redirect from="/" to="/contexts" />
                </Switch>
            </Provider>
        </main>
    );
};

export default Main;