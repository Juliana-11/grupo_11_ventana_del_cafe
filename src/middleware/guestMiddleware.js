function guestMiddleware (req,res,next){
    if (req.session.user != undefined){
        res.redirect('/')
    }else{
        next();
    }
}


module.exports = guestMiddleware;