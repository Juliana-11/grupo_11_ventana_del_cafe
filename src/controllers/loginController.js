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
        let existeEmail = users.find(userMail => userMail.userEmail == usuUsuarioFind);
        let existeUsu = users.find(userUsu => userUsu.userUserDescrip == usuUsuarioFind);
       
        if (existeEmail != undefined || existeUsu != undefined){
            let usuarioPos = 0;
            if (existeEmail != undefined ){
                 usuarioPos = users.indexOf(existeEmail);
                 req.session.email = users[usuarioPos].userEmail;
            }else{
                usuarioPos = users.indexOf(existeUsu);
                req.session.user = users[usuarioPos].userUserDescrip;
            }
            let passValida = bcrypt.compareSync(req.body.passwordLogin,users[usuarioPos].userPassword)
            

            if (passValida)
            {
                if (req.body.recuerdameLogin != undefined) {
                   res.cookie('recordame',req.session.user,{maxAge:  600000})
                }
                //res.render('loginAcceso',{usuarioLogin: req.session})
                /*
                if (req.session.email != undefined){
                    res.send('Usuario logueado:' +  req.session.email);
                }else{
                    res.send('Usuario logueado:' +  req.session.user);
                }*/
                
            }else{
                res.send('Password inválida.');
            }

        }else{
            res.send('Usuario no existe');
        }

    }
}

module.exports = loginController;