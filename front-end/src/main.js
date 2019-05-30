import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
export * from './sprite';

ReactDOM.render(<App />, document.getElementById("app"));