import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';
import uiTestComponents from '../components/ui';

// TODO: Should this really be necessary?
if (module.hot) {
    module.hot.accept();
}

window.initUITest = libName => {
    const data = require('../dummy-data.json');
    const ctr = document.getElementById("app");
    const Component = uiTestComponents[libName];

    if (Component) {
        ReactDOM.render(<Component data={ data }/>, ctr);
    }
    else {
        ReactDOM.render(<h1>UI library <code>{libName}</code> not found</h1>, ctr);
    }
}

window.initHome = () => {
    const ctr = document.getElementById("app");
    ReactDOM.render(<App/>, ctr);
};
