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

module.exports = app;