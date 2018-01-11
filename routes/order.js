var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var middleware = require("../middelware");

//home
router.get("/",middleware.isLoggedIn, function (req, res) {
    Order.find({"owner.id": req.user.id}).populate("products.product").sort({ "date" : -1 }).exec(function(err,orders){
        if(err){
            console.log(err);
        }else{
            Order.findOne({"owner.id":req.user.id,status: 'active'}).populate("products.product").exec(function(err,o){
               if(err){
                   console.log(err);
               } else{
                   console.log("cart = " + o);
                    res.render("orders/index",{cart:o,history:orders});
               }
            });
            
        }
    });
});

router.post("/:id/checkout",middleware.isLoggedIn,function(req,res){
    //order zoeken en status op pending zetten , dan mail sturen met details
    //dan res.redirect => flash message dat gelukt is
    // res.redirect();
    Order.findByIdAndUpdate(req.params.id,{status:"pending"},function(err,found){
        if(err){
            console.log(err);
        }else{
            console.log(found);
            res.redirect("/orders");
        }
    });
});


module.exports = router;