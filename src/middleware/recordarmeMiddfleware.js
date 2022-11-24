const fs = require('fs');
const path = require('path');
//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))
const db = require('../../database/models')
const {Op} = require("sequelize");
const User = db.User;

function recordarmeMiddleware (req,res,next){
    
    
    if (req.cookies.recordarme != undefined && req.session.user == undefined){
        console.log(req.cookies.recordarme )
        console.log(req.session.user)
        let usuario =   User.findAll({
                                    where: { [Op.or]: [{userEmail: req.cookies.recordarme }, {userAs: req.cookies.recordarme }]}
                                })
                        .then ( function (result){
                            if (result.length > 0){
                                req.session.user = result[0].dataValues.userAs;
                                let usuario = req.session.user
                                res.render('users/loginAcceso',{user: usuario})                                
                            }else{
                                next()
                            }
                        })       
    }else{
        next();
    }
   //next();  
}



module.exports= recordarmeMiddleware;