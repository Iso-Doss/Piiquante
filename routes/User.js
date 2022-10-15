const express = require('express');

const userController = require("../controllers/User");

const userMiddleware = require("../middleware/User");

const router = express.Router();

router.post('/signup', userMiddleware, userController.signup);

router.post('/login', userMiddleware, userController.login);

module.exports = router;