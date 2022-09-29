/*Requerir*/
//Express
const express = require('express');
const router = express.Router()

//Controlador
const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);

module.exports = router;