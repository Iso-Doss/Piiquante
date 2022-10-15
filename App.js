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
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

// Fix CORS issue.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Database connection.
mongoose.connect('mongodb+srv://' + process.env.MONGOOSE_DB_USER + ':' + process.env.MONGOOSE_DB_PASSWORD + '@' + process.env.MONGOOSE_DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    console.log('Connexion à MongoDB réussie !');

}).catch(() => {

    console.log('Connexion à MongoDB échouée !')

});

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

// Status code: https://kinsta.com/fr/blog/codes-statut-http/

//Ceci est pour gérer les problèmes de cors.
//https://www.npmjs.com/package/cors

//Ceci est pour gérer les générations de PDF.
// https://www.npmjs.com/package/pdf-creator-node
// https://www.npmjs.com/package/html-pdf-node

//Ceci est pour gérer l'envoi des mail.
//https://www.npmjs.com/package/nodemailer

//Node Application Metrics Dashboard.
//Express Status Monitor.