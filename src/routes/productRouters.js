/*Requerir*/
//Express
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const path = require('path');

//Middleware
const configMulterProduct = require('../middleware/configMulterProduct')

//controlador
const productController = require('../controllers/productController')

//Rutas
    //Index: lista de productos
router.get('/', productController.index);
    //Car: renderiza el carrito de compras
router.get('/car', productController.car);
    //Create: renderiza el formulario de creacion de producto
router.get('/create', productController.create);
    //Save: procesa los datos de producto creado
router.post('/create', configMulterProduct.single('productImage'), productController.save);
    //Delete: Eliminar producto
router.delete('/delete/:id', productController.delete);
    //Edit: muestra el formulario de edicion de productos
router.get('/edit/:id', productController.edit);
    //Update: Procesamiento de la edicion de un producto
router.put('/update', productController.update);
    //Detail: Detalle de producto :id
router.get('/:id', productController.detail);


module.exports = router;
