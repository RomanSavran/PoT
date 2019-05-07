import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Home from './home/Home'
import {Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux';

import * as reducers from '../store/reducers';

export const store = createStore(combineReducers(reducers), applyMiddleware(thunk));


const Main = () => {
    return (
        <main className="viewport">
            <Home />
        </main>
    );
};

export default Main;