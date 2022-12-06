const db = require('../../database/models')
const User = db.User;
const {check} = require('express-validator');
const validateRegister = [
    check('userName')
                        .notEmpty().withMessage('* Debe contener un nombre').bail()
                        .isLength({min:3}).withMessage('* Debe contener minimo 3 caracteres'),
    check('userLastName')
                        .notEmpty().withMessage('* Debe contener un apellido').bail()
                        .isLength({min:3}).withMessage('* Debe contener minimo 3 caracteres'),
    check('userEmail')
                        .notEmpty().withMessage('* Debe contener un email').bail()
                        .isEmail().withMessage('* Debe ingresar un correo válido')
                        ,
    check('userAs')
                        .notEmpty().withMessage('* Debe contener un usuario').bail()
                        /*.custom(
                            (value,{req})=> {
                                let usuUsuario = false ;
                                let k = 0;
                                while (k < users.length && usuUsuario == false){
                                    if (users[k].userAs == req.body.userAs ){
                                        usuUsuario = true;
                                    }
                                    k++;
                                }
                                if (usuUsuario === true){
                                    throw new Error('* Usuario ya registrado');
                                }
                                return true
                            } 
                        )*/,
    check('userPassword')
                        .notEmpty().withMessage('* Debe contener un password').bail()
                        .isLength({min:2,max:15}).withMessage('* Debe contener mínimo 6 caracteres y máximo 15'),
    check('userPasswordConfirm')
                        .notEmpty().withMessage('* Debe contener un password').bail()
                        .isLength({min:2,max:15}).withMessage('* Debe contener mínimo 6 caracteres y máximo 15')
                        .custom(
                            (value,{req})=> {
                                if (value != req.body.userPassword){
                                    throw new Error('* Passwords no coinciden');
                                }
                                return true
                            } 
                        ),
    /*check('userPhone')
                        .isNumeric().withMessage('* Debe contener un número telefónica').bail()*/
];

module.exports = validateRegister;