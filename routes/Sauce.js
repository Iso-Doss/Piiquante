const express = require('express');

const sauceController = require("../controllers/Sauce");

const authMiddleware = require("../middleware/Auth");

const multerConfigMiddleware = require("../middleware/MulterConfig");

const sauceMiddleware = require("../middleware/Sauce");

const router = express.Router();

router.post('/', authMiddleware, multerConfigMiddleware, sauceMiddleware, sauceController.create);

router.get('/:id', authMiddleware, sauceController.read);

router.get('/', authMiddleware, sauceController.readSauces);

router.put('/:id', authMiddleware, multerConfigMiddleware, sauceMiddleware, sauceController.update);

router.delete('/:id', authMiddleware, sauceController.delete);

router.post('/:id/like', authMiddleware, sauceController.likeAndDislike);

module.exports = router;