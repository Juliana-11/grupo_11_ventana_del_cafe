const db = require('../../../database/models');
const sequelize = db.sequelize;

const User = db.User;

const usersControllerApi = {
    'listado': (req, res) => {
        User.findAll()
            .then(listUser =>{
                let numero =listUser.length;
                if (numero !== 0){
                    return res.status(200).json({Total: listUser.length,listUser});
                }else{
                    return res.status(404).json('No hay datos');
                }
                
            })
        
    },
    'detalle': (req, res) => {
        User.findByPk(req.params.id)
            .then(userDetalle => {
                let numero =listUser.length;
                if ( numero !== 0){
                    return res.status(200).json(userDetalle);
                }else{
                    return res.status(404).json('No hay datos');
                }
                
            });
    }

}

module.exports = usersControllerApi;