/*Requerir*/
//Express
const fs = require('fs')
const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path');
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.resolve('../grupo_11_ventana_del_cafe/public/imag/userAvatars')
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname)
        callback(null, imageName);
    }
});
const {check} = require('express-validator');
const validateRegister = [
    check('nombreRegister')
                        .notEmpty().withMessage('* Debe contener un nombre').bail()
                        .isLength({min:3}).withMessage('* Debe contener minimo 3 caracteres'),
    check('apellidoRegister')
                        .notEmpty().withMessage('* Debe contener un apellido').bail()
                        .isLength({min:3}).withMessage('* Debe contener minimo 3 caracteres'),
    check('emailRegister')
                        .notEmpty().withMessage('* Debe contener un email').bail()
                        .isEmail().withMessage('* Debe ingresar un correo válido')
                        .custom(
                            (value,{req})=> {
                                let usuEmail = false ;
                                let k = 0;
                                while (k < users.length && usuEmail == false){
                                    if (users[k].userEmail == req.body.emailRegister ){
                                        usuEmail = true;
                                    }
                                    k++;
                                }
                                if (usuEmail === true){
                                    throw new Error('* Correo electrónico ya registrado');
                                }
                                return true
                            } 
                        ),
    check('usuarioRegister')
                        .notEmpty().withMessage('* Debe contener un usuario').bail()
                        .custom(
                            (value,{req})=> {
                                let usuUsuario = false ;
                                let k = 0;
                                while (k < users.length && usuUsuario == false){
                                    if (users[k].userUserDescrip == req.body.usuarioRegister ){
                                        usuUsuario = true;
                                    }
                                    k++;
                                }
                                if (usuUsuario === true){
                                    throw new Error('* Usuario ya registrado');
                                }
                                return true
                            } 
                        ),
    check('contraRegister')
                        .notEmpty().withMessage('* Debe contener un password').bail()
                        .isLength({min:2,max:15}).withMessage('* Debe contener mínimo 6 caracteres y máximo 15'),
    check('confirContraRegister')
                        .notEmpty().withMessage('* Debe contener un password').bail()
                        .isLength({min:2,max:15}).withMessage('* Debe contener mínimo 6 caracteres y máximo 15')
                        .custom(
                            (value,{req})=> {
                                if (value != req.body.contraRegister){
                                    throw new Error('* Passwords no coinciden');
                                }
                                return true
                            } 
                        ),
    check('telefonoRegister')
                        .isNumeric().withMessage('* Debe contener un número telefónica').bail()
];
var upload = multer({storage: multerDiskStorage});

//controlador
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

//middleware
let recordarmeMiddleware = require('../middleware/recordarmeMiddfleware')

router.get('/register', registerController.index);
router.post('/register',upload.single('avatarRegister'),validateRegister, registerController.create);
router.get('/login', loginController.index); 
router.post('/login', loginController.checkLogin); 
router.get('/profile', loginController.profile)


module.exports = router; 