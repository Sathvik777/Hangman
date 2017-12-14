import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Layout from './Layout';
import registerServiceWorker from './registerServiceWorker';
import NavBar from'./NavBar';

ReactDOM.render(<Layout />, document.getElementById('main'));
ReactDOM.render(<NavBar />, document.getElementById('nav-bar'));
registerServiceWorker();
