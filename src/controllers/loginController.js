const { Console, profile } = require('console');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const loginController = {
    index: (req, res)=>{
        res.render('users/login')
    },
    checkLogin: (req,res)=>{
        let usuEmailFind = req.body.userLogin;
        let usuUsuarioFind = req.body.userLogin;
        let existeEmail = false;
        let existeUsuario = false;
        let L = 1;
        let usuario;
        while ( L < users.length && (existeEmail == false && existeUsuario == false)){
            
            //console.log(L);
            if (users[L].userEmail == usuEmailFind){
                existeEmail = true;
                usuario = users[L]
            }
            if(users[L].userUserDescrip == usuUsuarioFind ){
                    existeUsuario = true;
                    usuario = users[L]
            }
            
            L++;
        }
       


        
        if (existeEmail == true || existeUsuario == true){
        
            let passValida = bcrypt.compareSync(req.body.passwordLogin,usuario.userPassword)
            
            if (passValida)
            {   
                req.session.user = req.body.userLogin;
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

module.exports = loginController;