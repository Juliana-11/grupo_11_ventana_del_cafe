//Requerimientos
const { Console, profile } = require('console');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { json } = require('express');
const db = require('../../database/models')
const {Op} = require("sequelize");

//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Modelos
const User = db.User;
const Day = db.Day_user;
const userController = {
    register: (req, res)=>{
        res.render('users/register')
    },

    create: (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let passNewUser = bcrypt.hashSync(req.body.userPassword, 10)
            let passConfNewUser = bcrypt.hashSync(req.body.userPasswordConfirm, 10);
            User.findAll({
                where: { [Op.or]: [{userEmail: req.body.userEmail}, {userAs: req.body.userAs}]}
            })
                .then (function(result) {
                    console.log(result.length)
                    if (result.length > 0){
                        console.log(req.body)
                        let mensajeDeEnvio ={
                            mgs: 'Ya existe un usuario registrado con esa descripción'
                        }
                        let old = req.body
                        res.render('users/register',{msgError: mensajeDeEnvio, old});
                    }else{
                        User.create({
                            username: req.body.userName,
                            userlastname: req.body.userLastName,
                            useremail: req.body.userEmail,
                            userAs: req.body.userAs,
                            password: passNewUser,
                            useravatar: req.file == undefined ? 'defaultImage.png': req.file.filename,
                            useraddress: req.body.userAddress,
                            userphone: req.body.telefonoRegister,
                        
                        }
                        )
                            .then (function (result){
            
                                if (req.body.ckeckboxUno){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 8
                                    })
                                }
            
                                if (req.body.ckeckboxDos){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 1
                                    })
                                }
            
                                if (req.body.ckeckboxTres){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 2
                                    })
                                }
            
                                if (req.body.ckeckboxCuatro){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 3
                                    })
                                }
            
                                if (req.body.ckeckboxCinco){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 4
                                    })
                                }
            
                                if (req.body.ckeckboxSeis){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 5
                                    })
                                }
            
                                if (req.body.ckeckboxSiete){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 6
                                    })
                                }
            
                                if (req.body.ckeckboxOcho){
                                    Day.create({
                                        id_user: result.null,
                                        id_day: 7
                                    })
                                }
                            })
                            res.render('users/confirm')
                    }
                })

        }else {
            res.render('users/register', {errors: errors.mapped(), old: req.body});
        }
    },

    confirm: (req, res)=>{
        res.render('users/confirm')
    },

    login: (req, res)=>{
        res.render('users/login')
    },
    session: (req,res)=>{
        let usuEmailFind = User.findAll({where:{ useremail: req.body.userLogin}});
        let usuUsuarioFind = User.findAll({where:{userAs: req.body.userLogin}});
        Promise.all([usuEmailFind,usuUsuarioFind])
            .then(function ([resultEmail,resultUsu]) {
                if (resultEmail.length == 0 && resultUsu.length == 0){
                    let mensajeDeEnvio ={
                        mgs: 'Usuario o correo electrónico inválido.'
                    }
                    res.render('users/login',{msgError: mensajeDeEnvio});
                }else{
                    if (resultEmail.length > 0){
                        let passValida = bcrypt.compareSync(req.body.passwordLogin,resultEmail[0].dataValues.password)
                        if (passValida){   
                                if (req.body.recuerdameLogin != undefined){
                                    res.cookie('recordarme',req.body.userLogin,{ maxAge: 900000});        
                                }
                                res.redirect('/users/profile'+'/'+resultEmail[0].id)
                            }else{
                                
                                let mensajeDeEnvio ={
                                    mgs: 'Password inválida'
                                }
                                res.render('users/login',{msgError: mensajeDeEnvio});
                            }
                    }
                    if (resultUsu.length > 0){
                        let passValida = bcrypt.compareSync(req.body.passwordLogin,resultUsu[0].dataValues.password)
                        

                        if (passValida){   
                                if (req.body.recuerdameLogin != undefined){
                                    res.cookie('recordarme',req.body.userLogin,{ maxAge: 900000});        
                                }
<<<<<<< HEAD
                                res.redirect('/users/profile/'+ resultUsu[0].id)
=======
                                res.redirect('/users/profile/'+resultUsu[0].id)
>>>>>>> 2a2bf1e5a054ca1c2ff9df7c177ed8c3ed30c709
                            }else{
                                
                                let mensajeDeEnvio ={
                                    mgs: 'Password inválida'
                                }
                                res.render('users/login',{msgError: mensajeDeEnvio});
                            }
                    }
                }
            })
    },
    retrieve:(req, res) => {
        res.render('users/retrieve')
    },
    profile: (req, res)=>{
        db.User.findByPk(req.params.id,
            {include: {model: db.Daysreceive, as:"associateDay_user" }})
        .then(user => {
            res.render('users/profile', {user})
        })
    },
    edit: (req, res) => {
        res.render('users/edit')
    }
}

module.exports = userController;