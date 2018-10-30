import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Libraries
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter basename="/triton">
        <App />
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.register();