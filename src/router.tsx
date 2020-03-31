import React, { FC } from 'react';
import {HashRouter as Router, useRouteMatch} from 'react-router-dom';
import EditorUI from './pages/editors';

const Editor = () => useRouteMatch('/editors') && <EditorUI />;

const RouterConfig: FC = () => {
    return (
        <Router>
            <Editor />
        </Router>
    );
};

export default RouterConfig;