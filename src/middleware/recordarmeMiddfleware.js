const fs = require('fs');
const path = require('path');
//data
const usersDataPath = path.join(__dirname, '../../data/usersDataBase.json')
const users = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'))

function recordarmeMiddleware (req,res,next){
    
    
    if (req.cookies.recordarme != undefined || req.session.user == undefined){
        let usuExistente = false;
        var p = 0;
        while (p < users.length && usuExistente == false){
            if (users[p].userAs == req.cookies.recordarme || users[p].userEmail == req.cookies.recordarme){
                usuExistente = true;
            }
            p++;
        }        
        if (usuExistente == true){
            req.session.user = users[p-1].userAs;
            let usuario = req.session.user
            res.render('users/loginAcceso',{user: usuario})
            
        }else{
            next()
        }
    }else{
        next();
    }
   //next();  
}



module.exports= recordarmeMiddleware;