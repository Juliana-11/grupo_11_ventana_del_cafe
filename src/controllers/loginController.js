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
        let usuEmailFind = req.body.email;
        let usuUsuarioFind = req.body.usuario;
        let existeEmail = users.find(userMail => userMail.userEmail == usuUsuarioFind);
        let existeUsu = users.find(userUsu => userUsu.userUserDescrip == usuUsuarioFind);
       
        if (existeEmail != undefined || existeUsu != undefined){
            let usuarioPos = 0;
            if (existeEmail != undefined ){
                 usuarioPos = users.indexOf(existeEmail);
            }else{
                usuarioPos = users.indexOf(existeUsu);
            }
            let passValida = bcrypt.compareSync(req.body.password,users[usuarioPos].userPassword)
           
            if (passValida)
            {
                res.send('Credenciales válidas. Usuario logueado');
            }else{
                res.send('Password inválida.');
            }

        }else{
            res.send('Usuario no existe');
        }

    }
}

module.exports = loginController;