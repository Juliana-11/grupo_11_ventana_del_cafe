/*Requerir*/
//Express
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer');
const path = require('path');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.resolve('../grupo_11_ventana_del_cafe/public/imag/productImages')
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname)
        callback(null, imageName);
    }
});
var upload = multer({storage: multerDiskStorage});


//controlador
const productCarController = require('../controllers/productCarController');
const productDetailController = require('../controllers/productDetailController');

//Index = lista de productos
router.get('/', productDetailController.index);
//renderiza el carrito de compras
router.get('/car', productCarController.index);
//renderiza la forma de creacion de producto
router.get('/create', productDetailController.create);
//Detalle de producto :id
router.get('/:id', productDetailController.detail);
//procesa los datos de producto creado
router.post('/save', upload.single('productImage'), productDetailController.save);
//Eliminar producto
router.delete('/delete/:id', productDetailController.delete);
//Formulario de edicion de productos
router.get('/edit/:id', productDetailController.edit);
//Procesamiento de la edicion de un producto
router.put('/update', productDetailController.update);


module.exports = router;
