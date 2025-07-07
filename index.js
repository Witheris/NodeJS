const express = require('express');
const app = express();
const port = 3000;

const rootRoute = require('./routes/root');
const staticRoute = require('./routes/static');
const dynamicRoute = require('./routes/dynamic');

app.use('/', rootRoute);
app.use('/static', staticRoute);
app.use('/dynamic', dynamicRoute);

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});