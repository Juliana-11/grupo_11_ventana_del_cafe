/*Requerir*/
//Express
const express = require('express');
const router = express.Router()

//Controlador
const mainController = require('../controllers/mainControllers')

//Home: muestra el home
router.get('/', mainController.home);

//AboutUs: muestra el equipo de trabajo
router.get('/aboutUs', mainController.aboutUs)

module.exports = router;