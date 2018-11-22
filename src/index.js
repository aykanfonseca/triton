import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Libraries
import { BrowserRouter } from 'react-router-dom';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render((
    <BrowserRouter forceRefresh={!supportsHistory} basename="/triton">
        <App />
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.register();