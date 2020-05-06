import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Recommends from './components/recommends';
import * as serviceWorker from './serviceWorker';

// const React = require('react')
// const ReactDOM = require('react-dom')
// const App = require('./App')
// require('./index.scss')

ReactDOM.hydrate(<App />, document.getElementById('root'))
if(window.location.pathname === '/home') {
    ReactDOM.render(<Recommends />, document.getElementById('react-root'))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
