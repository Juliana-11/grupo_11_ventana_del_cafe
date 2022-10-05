const fs = require('fs');
const path = require('path');

//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))

function recordarmeMiddleware (req,res,next){
   
    if (req.cookies.recordame != undefined && req.session.user == undefined){
        let usuExistente = users.indexOf(req.cookies.recordame);
        
        if (usuExistente != -1){
            req.session = users[usuExistente];
        }else{
            res.send('Error al cargar cookie');
        }
    }
    next();
}



module.exports= recordarmeMiddleware;