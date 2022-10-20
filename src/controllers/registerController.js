const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { json } = require('express');
const bcrypt = require('bcryptjs');

//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const registerController = {
    index: (req, res)=>{
        res.render('users/register')
    },
    create: (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let passNewUser = bcrypt.hashSync(req.body.contraRegister,10)
            let passConfNewUser = bcrypt.hashSync(req.body.confirContraRegister,10);
            console.log(req.file)
            let newUser = {
                id: users.length == 0? 1 : users[users.length - 1].id + 1,
                userFirstName: req.body.nombreRegister,
                userLastName: req.body.apellidoRegister,
                userEmail: req.body.emailRegister,
                userUserDescrip: req.body.usuarioRegister,
                userPassword: passNewUser,
                userPasswordConfirm: passConfNewUser,
                userAvatar: req.file == undefined ? 'defaultImage.png': req.file,
                userDirecUno: req.body.direccionUnoRegister,
                userDirecDos: req.body.direccionDosRegister,
                userChecTodosDias: req.body.ckeckboxUno,
                userChecLunes: req.body.ckeckboxDos,
                userChecMartes: req.body.ckeckboxTres,
                userChecMiercoles: req.body.ckeckboxCuatro,
                userChecJueves: req.body.ckeckboxCinco,
                userChecViernes: req.body.ckeckboxSeis,
                userChecSabado: req.body.ckeckboxSiete,
                userChecDomingo: req.body.ckeckboxOcho,
                userTelefono: req.body.telefonoRegister
            }
            let usuExiste = false ;
            let k = 0;
            while (k < users.length && usuExiste == false){
                if (users[k].userUserDescrip == req.body.usuarioRegister ){
                    usuExiste = true;
                }
                k++;
            }

            if ( usuExiste == false){
                users.push(newUser);
                fs.writeFileSync(usersDataPath,JSON.stringify(users),'utf-8');
                res.render('users/register')
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
    }
}

module.exports = registerController;