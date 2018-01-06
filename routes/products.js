var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var Order = require("../models/order");
var User = require("../models/user");
var middleware = require("../middelware");

//home
router.get("/",middleware.isLoggedIn, function (req, res) {
    Product.find({},function(err,p){
        if(err){
            console.log(err);
        }else{
            //insert order of current user
            Order.findOne({'owner':req.user.username,'status':'pending'},function(err,foundOrder){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundOrder);
                    res.render("products/index",{products: p,order:foundOrder});
                }
            });
            
        }
    });
});

router.get("/new",middleware.isAdmin,function(req,res){
    res.render("products/new");
});

router.post("/",middleware.isAdmin,function(req,res){
    console.log("entering adding product");
    var newProduct = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image,
        available: true
    };
    Product.create(newProduct,function(err,p){
        if(err){
            console.log(err);
        }else{
            console.log("added a new product");
            res.redirect("/products");
        }
    });
});

router.get("/:id/edit",middleware.isAdmin,function(req,res){
Product.findById(req.params.id,function(err,foundP){
    if(err){
        console.log(err);
    }else{
        res.render("products/edit",{
            product: foundP
        });
    }
});
});

router.put("/:id",middleware.isAdmin,function(req,res){
    var a = req.body.product.available;
    a ? req.body.product.available = true : req.body.product.available = false;
    Product.findByIdAndUpdate(req.params.id,req.body.product,function(err,updatedProduct){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            console.log(updatedProduct);
            res.redirect("/products");
        }
    });
});


router.delete("/:id",middleware.isAdmin,function(req,res){
    Product.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/products");
        }else{
            res.redirect("/products");
        }
    });
});

router.post("/:id/add-to-cart",middleware.isLoggedIn,function(req,res){
    console.log(req.body.box);
    console.log(req.params.id);

    //eerst order zoeken indien geen => maken


    res.redirect("/products");
});

/*
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = ‘image/png’;
 newItem.save();
});
*/ 


module.exports = router;