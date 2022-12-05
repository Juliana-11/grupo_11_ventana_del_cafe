const db = require('../../../database/models');
const sequelize = db.sequelize;

const Products = db.Product;

const productsControllerApi = {
    'listado': (req, res) => {
        Products.findAll()
            .then(listProducts =>{
                
                if (listProducts != null){
                    return res.status(200).json(listProducts);
                }else{
                    return res.status(204).json('No hay datos');
                }
                
            })
        
    },
    'detalle': (req, res) => {
        Products.findByPk(req.params.id)
            .then(DetalleProduct => {
                if (DetalleProduct != null){
                    return res.status(200).json(DetalleProduct);
                }else{
                    return res.status(204).json("no hay datos");
                }
            });
    }

}

module.exports = productsControllerApi;