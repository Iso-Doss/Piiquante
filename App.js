// Status code: https://kinsta.com/fr/blog/codes-statut-http/

require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const path = require("path");

const rateLimit = require('express-rate-limit')

const swaggerUi = require('swagger-ui-express');

const fs = require('fs');

const helmet = require("helmet");

const sauceRoutes = require('./routes/Sauce');

const userRoutes = require('./routes/User');

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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Database connection.
mongoose.connect
(
    'mongodb+srv://' + process.env.MONGOOSE_DB_USER + ':' + process.env.MONGOOSE_DB_PASSWORD + '@passez-au-full-stack-av.ncoygvz.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    () => console.log('Connexion à MongoDB réussie !')
).catch(
    () => console.log('Connexion à MongoDB échouée !')
);

// Create uploads images folder if it's not exist.
const dir = './images';

if (!fs.existsSync(dir)) {

    fs.mkdirSync(dir, {recursive: true});

}

//Route registration
app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;