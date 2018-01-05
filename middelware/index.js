var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

middlewareObj.isAdmin = function(req,res,next){
    if(req.user === undefined){
            console.log("Got ya!");
            res.redirect("/");
    }else if(req.user.tag === "admin"){
        return next();
    }else if(req.user.tag == "user"){
        res.redirect("/products");
    }
}

middlewareObj.logIT = function(req,res,next){
    console.log(req.user);
    return next();
}

module.exports = middlewareObj;