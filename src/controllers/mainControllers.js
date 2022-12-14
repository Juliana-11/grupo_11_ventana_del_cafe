const mainController = {
    home: (req, res)=>{
        if(req.session.user){
            let session = req.session.user
            res.render("main/index", {session})
        }
        res.render("main/index")
    }
}

module.exports = mainController;