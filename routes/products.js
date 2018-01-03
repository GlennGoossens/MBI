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

router.put("/:id",function(req,res){
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


router.delete("/:id",function(req,res){
    Product.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/products");
        }else{
            res.redirect("/products");
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