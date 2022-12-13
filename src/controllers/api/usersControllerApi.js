const db = require('../../../database/models');
const sequelize = db.sequelize;

const User = db.User;

const usersControllerApi = {
    'listado': (req, res) => {
        User.findAll({
            attributes: ['id', 'userName','userEmail']
          })
            .then(listUser =>{
                let numero =listUser.length;
                if (numero !== 0){
                    //return res.status(200).json({Total: listUser.length,listUser});
                    return res.status(200).json(listUser.userName);
                }else{
                    return res.status(404).json({message:'No hay datos'});
                }
                
            })
        
    },
    'detalle': (req, res) => {
        User.findByPk(req.params.id)
            .then(userDetalle => {
                let numero =userDetalle.length;
                if ( numero !== 0){
                    return res.status(200).json(userDetalle);
                }else{
                    return res.status(404).json({message:'No hay datos'});
                }
                
            });
    }

}

module.exports = usersControllerApi;