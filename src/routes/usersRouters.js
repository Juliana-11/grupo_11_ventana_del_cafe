/*Requerir*/
//Express
const fs = require('fs')
const express = require('express');
const router = express.Router();
const path = require('path');
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));

//Middleware
const configmulterUser = require('../middleware/configMulterUser');
const validateRegister = require('../middleware/validateRegister');
let recordarmeMiddleware = require('../middleware/recordarmeMiddfleware');

//controllers
const userController = require('../controllers/userController');

//Routes
    //Register: muestra el formulario de registro
router.get('/register', recordarmeMiddleware, userController.register);
    //Create: procesa el registro
router.post('/register', configmulterUser.single('userAvatar'),validateRegister, userController.create);
    //Confirm: Verifica si se registro
router.get('/profile/confirm', userController.confirm);
    //login: muestra el formulario de login
router.get('/login',recordarmeMiddleware, userController.login); 
    //session: procesa el inicio de sesion
router.post('/login', userController.session);
    //retrieve: Recupera session
router.get('/recuperarsession', userController.retrieve)
    //Profile: renderiza el perfil
router.get('/profile/:id', userController.profile)

module.exports = router; 