var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middelware");

//home
router.get("/", function (req, res) {
    res.render("landing");
  
});

//auth
router.get("/register",middleware.isAdmin,function(req,res){
    res.render("register");
});

router.post("/register",middleware.isAdmin,function(req,res){
    User.register(new User({
        username: req.body.username,
        address: req.body.address,
        currentOrder: null,
        orders: null
    }),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.redirect("/");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/products");
        });
    });
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/products",
    failureRedirect: "/"
}),function(req,res){});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});


module.exports = router;