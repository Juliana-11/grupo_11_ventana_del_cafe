/*Requerir*/
//Express
const express = require('express');
const router = express.Router()

//controlador
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

router.get('/register', registerController.index);
router.post('/register', registerController.create);
router.get('/login', loginController.index); 
router.post('/login', loginController.checkLogin); 


module.exports = router; 