function userLoggedMiddleware (req,res,next){
    if (req.session.user == undefined){
        res.redirect('/users/login')
    }else{
        next();
    }
}


module.exports = userLoggedMiddleware;