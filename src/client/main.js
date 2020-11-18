import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

const ctr = document.getElementById("app");

// TODO: Should this really be necessary?
if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App/>, ctr);
