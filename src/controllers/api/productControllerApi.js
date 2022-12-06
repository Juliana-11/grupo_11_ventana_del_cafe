const db = require('../../../database/models');
const sequelize = db.sequelize;

const Products = db.Product;

const productsControllerApi = {
    'listado': (req, res) => {
        Products.findAll()
            .then(listProducts =>{
                let numero = listProducts.length
                if (numero !== 0){
                    return res.status(200).json({Total: listProducts.length,listProducts});
                }else{
                    return res.status(404).json({message:'No hay datos'});
                }
                
            })
        
    },
    'detalle': (req, res) => {
        Products.findByPk(req.params.id)
            .then(DetalleProduct => {
                if (DetalleProduct != null){
                    return res.status(200).json(DetalleProduct);
                }else{
                    return res.status(204).json({message:'No hay datos'});
                }
            });
    }

}

module.exports = productsControllerApi;