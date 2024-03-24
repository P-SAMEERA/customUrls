const express = require('express');

const app = express.Router();

const urlRouter = require('./url.route');

app.use('api/url',urlRouter);


module.exports = app;