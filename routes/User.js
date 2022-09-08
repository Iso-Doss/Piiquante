const express = require('express');

const userController = require("../controllers/User");

const signupLoginMiddleware = require("../middleware/SignupLogin");

const router = express.Router();

router.post('/signup', signupLoginMiddleware, userController.signup);

router.post('/login', signupLoginMiddleware, userController.login);

module.exports = router;