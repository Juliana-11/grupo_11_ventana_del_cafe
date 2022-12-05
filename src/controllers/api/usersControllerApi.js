const db = require('../../../database/models');
const sequelize = db.sequelize;

const User = db.User;

const usersControllerApi = {
    'listado': (req, res) => {
        User.findAll()
            .then(listUser =>{
                
                if (listUser != null){
                    return res.status(200).json(listUser);
                }else{
                    return res.status(204).json('No hay datos');
                }
                
            })
        
    },
    'detalle': (req, res) => {
        User.findByPk(req.params.id)
            .then(userDetalle => {
                
                if (userDetalle != null){
                    return res.status(200).json(userDetalle);
                }else{
                    return res.status(204).json("no hay datos");
                }
                
            });
    }

}

module.exports = usersControllerApi;