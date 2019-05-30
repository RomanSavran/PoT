import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '../store'

import Header from './Header'
import Main from './Main'

import '../less/layouts/App.less';

const App = () => (
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <Header />
                <section className="flex viewport">
                    <Main />
                </section>
            </React.Fragment>
        </Router>
    </Provider>
);

export default App;
