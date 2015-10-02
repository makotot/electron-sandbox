import polyfill from 'babel/polyfill';
import React from 'react';

import {Container} from './components/container.jsx';

React.render(React.createElement(Container), document.getElementById('app'));
