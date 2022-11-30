const fs = require('fs');
const path = require('path');
//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))
const db = require('../../database/models')
const {Op} = require("sequelize");
const User = db.User;

function recordarmeMiddleware (req,res,next){
    
    console.log('entre en recordarmeMiddleware')
    if (req.cookies.recordarme != undefined){
        console.log('entre al primer if')
        User.findAll({include: {model: db.Daysreceive, as:"associateDay_user" }},
                                    {where: { [Op.or]: [{userEmail: req.cookies.recordarme }, {userAs: req.cookies.recordarme }]}}
                                    )
                        .then ( function (result){
                            let usuario = result;
                            console.log('Antes del segundo if')
                            if (usuario){
                                req.session.user = usuario.dataValues;
                                let userLogged = req.session.user
                                console.log(userLogged)
                                res.render('users/profile',{user: userLogged})                               
                            }else{
                                next()
                            }
                        })       
    }else{
        console.log('Sali de recordarmeMiddleware')
        next();
    }
   

  /*
   if (req.cookies.recordarme != undefined ){
        if(req.session.user == undefined){
            let usuario =   User.findAll({include: {model: db.Daysreceive, as:"associateDay_user" }},
                                        {where: { [Op.or]: [{userEmail: req.cookies.recordarme }, {userAs: req.cookies.recordarme }]}}
                                        )
                            .then ( function (result){
                                if (result.length > 0){
                                    req.session.user = result[0].dataValues;
                                    let usuario = req.session.user
                                    res.render('users/profile',{user: usuario})                               
                                }else{
                                    next()
                                }
                            }) 
        }else{
            let usuario =   User.findAll({include: {model: db.Daysreceive, as:"associateDay_user" }},
            {where: { [Op.or]: [{userEmail: req.cookies.recordarme }, {userAs: req.cookies.recordarme }]}}
            )
            .then ( function (result){
                if (result.length > 0){
                    req.session.user = result[0].dataValues;
                    let usuario = req.session.user
                    res.render('users/profile',{user: usuario})                               
                } })
        }      
    }else{
        next();
    }*/
}



module.exports= recordarmeMiddleware;