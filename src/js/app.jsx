import polyfill from 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from './components/container';

ReactDOM.render(<Container />, document.getElementById('app'));
