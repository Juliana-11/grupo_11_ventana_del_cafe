/*Requerir*/
//Express
const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path');
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
var upload = multer({storage: multerDiskStorage});

//controlador
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

//middleware
let recordarmeMiddleware = require('../middleware/recordarmeMiddfleware')

router.get('/register', registerController.index);
router.post('/register',upload.single('avatarRegister'), registerController.create);
router.get('/login', loginController.index); 
router.post('/login', loginController.checkLogin); 
router.get('/profile', loginController.profile)


module.exports = router; 