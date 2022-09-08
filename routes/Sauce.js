const express = require('express');

const sauceController = require("../controllers/Suace");

const router = express.Router();

router.post('/', sauceController.createSauce);

router.get('/:id', sauceController.readSauce);

router.get('/', sauceController.readSauces);

router.put('/:id', sauceController.updateSauce);

router.delete('/:id', sauceController.deleteSauce);

module.exports = router;