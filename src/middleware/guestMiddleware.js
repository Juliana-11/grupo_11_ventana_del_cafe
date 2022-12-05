function guestMiddleware (req,res,next){
    if (req.session.user != undefined){
        res.redirect('/')
    }else{
        console.log('el body');
        console.log(req.body);
        next();
    }
}


module.exports = guestMiddleware;