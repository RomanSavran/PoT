import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
export * from './sprite';

ReactDOM.render(<App />, document.getElementById("app"));