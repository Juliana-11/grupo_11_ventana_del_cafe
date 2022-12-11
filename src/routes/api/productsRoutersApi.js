const express = require('express');
const router = express.Router();
const productsControllerApi = require('../../controllers/api/productControllerApi');

router.get('/',productsControllerApi.listado);
router.get('/:id',productsControllerApi.detalle);



module.exports = router;