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
        var L = 1;
        var usuario;
        console.log('Ingrese al checkLogin')
        console.log(users.length)
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
                res.send('login correcto')  
                 
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
            res.send('Usuario o correo electrónico inválido.');
        }

    },
    profile: (req, res)=>{
        res.render('users/profile')
    }
}

module.exports = loginController;