const express = require('express');
const path = require('path');

const setupDev = require('./dev');

const port = process.env.APP_PORT || 80;

const app = express();

if (process.env.NODE_ENV == 'development') {
    setupDev(app);
}
else {
    app.use('/static', express.static('/var/app/static'));
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve('templates/index.html'));
});

app.get('/ui', (req, res) => {
    res.sendFile(path.resolve('templates/ui.html'));
});

app.listen(port, () => {
    console.log('Listening');
});
