const express = require('express');
const router = express.Router();
const usersControllerApi = require('../../controllers/api/usersControllerApi');

router.get('/',usersControllerApi.listado);
router.get('/:id',usersControllerApi.detalle);



module.exports = router;