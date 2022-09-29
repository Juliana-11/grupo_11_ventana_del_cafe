const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
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
        if(errors.isEmpty){
            let newUser = {
                id: users.length == 0? 1 : users[users.length - 1].id + 1,
                userFirstName: req.body.nombre,
                userLastName: req.body.apellido,
                userUserDescrip: req.body.usuario,
                userEmail: req.body.email,
                userPassword: bcrypt.hashSync(req.body.password,12)
            }
            users.push(newUser);
            fs.writeFileSync(usersDataPath,JSON.stringify(users),'utf-8');
            res.render('users/register')
        }else {
            let oldData = req.body;
            res.render('users/register', {errors: errors.mapped(), oldData});
        }
    }
}

module.exports = registerController;