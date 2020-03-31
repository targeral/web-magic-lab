import React from 'react';
import {render} from 'react-dom';
import APP from './app';

render(
    React.createElement(APP),
    document.getElementById('app')
);