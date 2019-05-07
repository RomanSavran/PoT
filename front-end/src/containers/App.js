import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header'
import Main from './Main'

import '../less/layouts/App.less';

const App = () => (
    <Router>
        <React.Fragment>
            <Header />
            <section className="flex viewport">
                <Main />
            </section>
        </React.Fragment>
    </Router>
);

export default App;
