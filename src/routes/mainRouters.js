/*Requerir*/
//Express
const express = require('express');
const router = express.Router()

//Controlador
const mainController = require('../controllers/mainControllers')

//Home: muestra el home
router.get('/', mainController.home);

module.exports = router;