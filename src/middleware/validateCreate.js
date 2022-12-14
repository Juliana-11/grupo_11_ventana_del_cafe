const db = require('../../database/models')
const User = db.User;
const {check} = require('express-validator');
const validateCreate = [
    check('productName')
                        .notEmpty().withMessage('* Debe contener un nombre').bail()
                        .isLength({min:5}).withMessage('* Debe contener minimo 5 caracteres'),
    check('productPrice')
                        .notEmpty().withMessage('* Debe contener un precio').bail()
                        .isDivisibleBy(1).withMessage('* Debe ingresar solo números'),
    check('productDiscount')
                        .notEmpty().withMessage('* Debe contener un descuento').bail()
                        .isDivisibleBy(1).withMessage('* Debe ingresar solo números'),
                        
    check('productStock')
                        .notEmpty().withMessage('* Indica la cantidad disponible').bail()
                        .isDivisibleBy(1).withMessage('* Debe ingresar solo números'),
    check('productOrigin')
                        .notEmpty().withMessage('* Debe contener el lugar de origen del producto').bail()
                        .isLength({min:5}).withMessage('* Debe contener mínimo 6 caracteres y máximo 15'),
    check('description')
                        .notEmpty().withMessage('* Debe contener una descripción').bail()
                        .isLength({min:2,max:50}).withMessage('* Debe contener mínimo 6 caracteres y máximo 50')

];

module.exports = validateCreate;