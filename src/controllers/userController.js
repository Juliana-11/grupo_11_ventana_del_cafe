//Requerimientos
const { Console, profile } = require('console');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { json } = require('express');
const db = require('../../database/models');
const {Op} = require("sequelize");

//data
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Modelos
const User = db.User;
const Day = db.Day_user;
const userController = {
    register: (req, res)=>{
        res.render('users/register')
    },

    create: async (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let passNewUser = bcrypt.hashSync(req.body.userPassword, 10)
            let passConfNewUser = bcrypt.hashSync(req.body.userPasswordConfirm, 10);
            User.findAll({
                where: { [Op.or]: [{userEmail: req.body.userEmail}, {userAs: req.body.userAs}]}
            })
                .then (function(result) {
                    if (result.length > 0){
                        let mensajeDeEnvio ={
                            mgs: 'Ya existe un usuario registrado con esa descripción'
                        }
                        let old = req.body
                        res.render('users/register',{msgError: mensajeDeEnvio, old});
                    }else{
                         User.create({
                            userName: req.body.userName,
                            userLastName: req.body.userLastName,
                            userEmail: req.body.userEmail,
                            userAs: req.body.userAs,
                            password: passNewUser,
                            userAvatar: req.file == undefined ? 'defaultImage.png': req.file.filename,
                            userAddress: req.body.userAddress,
                            userPhone: req.body.telefonoRegister,
                        
                        }
                        )
                            .then (function (result){
                                           
                                if (req.body.ckeckboxUno){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 8
                                    })
                                }
            
                                if (req.body.ckeckboxDos){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 1
                                    })
                                }
            
                                if (req.body.ckeckboxTres){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 2
                                    })
                                }
            
                                if (req.body.ckeckboxCuatro){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 3
                                    })
                                }
            
                                if (req.body.ckeckboxCinco){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 4
                                    })
                                }
            
                                if (req.body.ckeckboxSeis){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 5
                                    })
                                }
            
                                if (req.body.ckeckboxSiete){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 6
                                    })
                                }
            
                                if (req.body.ckeckboxOcho){
                                    Day.create({
                                        user_id: result.dataValues.id,
                                        day_id: 7
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
        let usuEmailFind = User.findAll({where:{ userEmail: req.body.userLogin}});
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
                                let usuario = resultEmail;
                                req.session.user =   usuario;
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
                                let usuario = resultUsu;
                                req.session.user =   usuario;
                                if (req.body.recuerdameLogin != undefined){
                                    res.cookie('recordarme',req.body.userLogin,{ maxAge: 900000});        
                                }
                                res.redirect('/users/profile/'+resultUsu[0].id)
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
            {include: {model: db.DaysReceive, as:"associateDay_User"}}
            )
        .then(user => {
            res.render('users/profile', {user})
            
        })
    },
    edit: (req, res) => {
        let userId = req.params.id;
        User.findByPk(userId)
            .then ( function(result){
                
                let userOld = result.dataValues
                res.render('users/edit',{old: userOld})
            })
        
    },
    saveEdit: (req,res)=>{
        let idUser = req.params.id;
        //console.log(idUser)
        let passNewUser = bcrypt.hashSync(req.body.userPassword, 10);
        User.update({
            username: req.body.userName,
            userlastname: req.body.userLastName,
            useremail: req.body.userEmail,
            userAs: req.body.userAs,
            password: passNewUser,
            useravatar: req.file == undefined ? 'defaultImage.png': req.file.filename,
            useraddress: req.body.userAddress,
            userphone: req.body.telefonoRegister,
        
        },
        { where: {id: idUser}}
        )
            .then( result => {res.redirect('/')})
    },
    destroy:(req, res) => {
        req.session.user = undefined
        res.redirect('/')
    },
    deleteUser: (req, res) => {
        let idParam = req.params.id;
        User.destroy({where : {id: idParam }})
        res.redirect('/')
    }
}

module.exports = userController;