const { Console } = require('console');
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
        let existeUsuario = false
        L = 0;
        console.log('antes del while')
        while ( L < users.length && existeEmail == false && existeUsuario == false){
            L++;
            console.log('antes del primer if')
            if (users[L].userEmail == usuEmailFind){
                existeEmail = true;
                console.log('dentro de primer if')
            }else{
                if(users[L].userUserDescrip == usuUsuarioFind ){
                    existeUsuario = true;
                }
            }
            
        }
        console.log(L)
        console.log('despues del while');
        console.log('existe email ?')
        console.log(existeEmail)
        console.log('existe usuario ?')
        console.log(existeUsuario)
        if (existeEmail == true || existeUsuario == true){
        
            
            let passValida = bcrypt.compareSync(req.body.passwordLogin,users[L].userPassword)
            console.log('comparacion de contraseña')
            console.log(passValida)
            if (passValida)
            {
                res.send('login correcto')    
            }else{
                
                let mensajeDeEnvio ={
                    mgs: 'Password inválida'
                }
                res.render('users/login',{msgError: mensajeDeEnvio});
                //res.send('Password inválida.');
            }

        }else{
           /* let msjError = {
                msg: 'Usuario o correo electrónico inválido.'
            }*/
            //res.render('users/login',{errores: msjError})
            //console.log('pase por usuario invalido')
            let mensajeDeEnvio ={
                mgs: 'Usuario o correo electrónico inválido.'
            }
            res.render('Usuario o correo electrónico inválido.');
        }

    }
}

module.exports = loginController;