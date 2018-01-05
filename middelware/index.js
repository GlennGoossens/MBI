var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    console.log(currentUser);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

middlewareObj.isAdmin = function(req,res,next){
    if(admin){
        return next();
    }
    res.redirect("back");
}

module.exports = middlewareObj;