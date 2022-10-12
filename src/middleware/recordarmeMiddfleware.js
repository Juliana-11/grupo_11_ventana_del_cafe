const fs = require('fs');
const path = require('path');
//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))

function recordarmeMiddleware (req,res,next){
    
    if (req.cookies.recordarme != undefined && req.session.user == undefined){
        let usuExistente = false;
        let p = 0;
        console.log('entre al if')
        while (p < users.length && usuExistente == false){
            if (users[p].userUserDescrip == req.cookies.recordarme || users[p].userEmail == req.cookies.recordarme){
                usuExistente = true;
            }
            p++;
        }
        //console.log(users.length)
        console.log(p)
        if (usuExistente == true){
            //req.session.user = users[p].userUserDescrip;
            //res.send(req.session)
            console.log(users[p].userUserDescrip)
        }else{
            res.send('Error al cargar cookie');
        }
    }
    //next();
}



module.exports= recordarmeMiddleware;