//Requerimientos
const { Console, profile } = require('console');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { json } = require('express');

//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
    register: (req, res)=>{
        res.render('users/register')
    },

    create: (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let passNewUser = bcrypt.hashSync(req.body.userPassword, 10)
            let passConfNewUser = bcrypt.hashSync(req.body.userPasswordConfirm, 10);
            let newUser = {
                id: users.length == 0? 1 : users[users.length - 1].id + 1,
                userName: req.body.userName,
                userLastName: req.body.userLastName,
                userEmail: req.body.userEmail,
                userAs: req.body.userAs,
                userPassword: passNewUser,
                userPasswordConfirm: passConfNewUser,
                userAvatar: req.file == undefined ? 'defaultImage.png': req.file,
                userAddress: req.body.userAddress,
                userChecTodosDias: req.body.ckeckboxUno,
                userChecLunes: req.body.ckeckboxDos,
                userChecMartes: req.body.ckeckboxTres,
                userChecMiercoles: req.body.ckeckboxCuatro,
                userChecJueves: req.body.ckeckboxCinco,
                userChecViernes: req.body.ckeckboxSeis,
                userChecSabado: req.body.ckeckboxSiete,
                userChecDomingo: req.body.ckeckboxOcho,
                userPhone: req.body.userPhone
            }
            let usuExiste = false ;
            let k = 0;
            
            while (k < users.length && usuExiste == false){
                if (users[k].userAs == req.body.userAs ){
                    usuExiste = true;
                }
                k++;
            }
            
            if ( usuExiste == false){
                users.push(newUser);
                fs.writeFileSync(usersDataPath,JSON.stringify(users),'utf-8');
                res.render('users/confirm')
            }else{
                //res.send('Ya existe un usuario registrado con esa descripción')
                let mensajeDeEnvio ={
                    mgs: 'Ya existe un usuario registrado con esa descripción'
                }
                let oldData = req.body;
                res.render('users/register',{msgError: mensajeDeEnvio,oldData});
                
            }
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
        let usuEmailFind = req.body.userLogin;
        let usuUsuarioFind = req.body.userLogin;
        let existeEmail = false;
        let existeUsuario = false;
        let L = 1;
        let usuario;
        while ( L < users.length && (existeEmail == false && existeUsuario == false)){
            if (users[L].userEmail == usuEmailFind){
                existeEmail = true;
                usuario = users[L]
            }
            if(users[L].userAs == usuUsuarioFind ){
                    existeUsuario = true;
                    usuario = users[L]
            }
            
            L++;
        }
              
        if (existeEmail == true || existeUsuario == true){
        
            let passValida = bcrypt.compareSync(req.body.passwordLogin,usuario.userPassword)
            
            if (passValida)
            {   
                //console.log(req.body.recuerdameLogin)
                //console.log(req.cookie)
                //req.session.user = req.body.userLogin;
                if (req.body.recuerdameLogin != undefined){
                    res.cookie('recordarme',req.body.userLogin,{ maxAge: 900000});        
                }
                res.redirect('/users/profile')
                 
            }else{
                
                let mensajeDeEnvio ={
                    mgs: 'Password inválida'
                }
                res.render('users/login',{msgError: mensajeDeEnvio});
            }

        }else{
           
            let mensajeDeEnvio ={
                mgs: 'Usuario o correo electrónico inválido.'
            }
            res.render('users/login',{msgError: mensajeDeEnvio});
        }

    },
    profile: (req, res)=>{
        let id = req.params.id
        let user = users.find(aUser => aUser.id == id)
        res.render('users/profile', {user: user})
    }
}

module.exports = userController;