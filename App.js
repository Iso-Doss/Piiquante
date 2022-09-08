require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const path = require("path");

const rateLimit = require('express-rate-limit')

const swaggerUi = require('swagger-ui-express');

const fs = require('fs');

const helmet = require("helmet");

const app = express();

// Make application request body available.
app.use(express.json());

// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());

// Fix CORS issue.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;