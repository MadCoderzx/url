const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => res.send({ status: 'ok', message: 'URL Shortener API' }));
app.use(errorHandler);

module.exports = app;
