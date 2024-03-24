const express = require('express');
const cors = require('cors');
const {corsOptions} = require('../config/cors.config');
const { redirectToUrl, analytics, createShortUrls } = require('../controllers/url.controller');

const Router = express.Router();

Router.post('/shorten', cors(corsOptions), createShortUrls);
Router.get('/:shortId', cors(corsOptions), redirectToUrl);
Router.get('/analyse/:shortId', cors(corsOptions), analytics);

module.exports = Router;
