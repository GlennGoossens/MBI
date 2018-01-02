var express = require("express");
var router = express.Router();
var Product = require("../models/product");
//home
router.get("/", function (req, res) {
    Product.find({},function(err,p){
        if(err){
            console.log(err);
        }else{
            res.render("products/index",{products: p});
        }
    });
});

router.get("/new",function(req,res){
    res.render("products/new");
});

router.post("/",function(req,res){
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

router.get("/:id/edit",function(req,res){
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

/*
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = ‘image/png’;
 newItem.save();
});
*/ 


module.exports = router;