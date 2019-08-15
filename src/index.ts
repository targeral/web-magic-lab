import React from 'react';
import {render} from 'react-dom';
import APP from './app';
import Router from './router';

const router = new Router();

router.route('/', function () {
    console.log('white');
});
router.route('/blue', function () {
    console.log('blue');
});
router.route('/green', function () {
    console.log('green');
});

render(
    React.createElement(APP),
    document.getElementById('app'),
    () => router.init()
);