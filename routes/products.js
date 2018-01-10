var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var Order = require("../models/order");
var User = require("../models/user");
var middleware = require("../middelware");

//home
router.get("/", middleware.isLoggedIn, function (req, res) {
    Product.find({}, function (err, p) {
        if (err) {
            console.log(err);
        } else {
            Order.findOne({
                "owner.id": req.user.id,
                status: 'active'
            }).populate("products.product").exec(function (err, foundOrder) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(foundOrder);
                    res.render("products/index", {
                        products: p,
                        order: foundOrder
                    });
                }

            });
        }
    });
});

router.get("/new", middleware.isAdmin, function (req, res) {
    res.render("products/new");
});

router.post("/", middleware.isAdmin, function (req, res) {
    console.log("entering adding product");
    var newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        available: true
    };
    Product.create(newProduct, function (err, p) {
        if (err) {
            console.log(err);
        } else {
            console.log("added a new product");
            res.redirect("/products");
        }
    });
});

router.get("/:id/edit", middleware.isAdmin, function (req, res) {
    Product.findById(req.params.id, function (err, foundP) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/edit", {
                product: foundP
            });
        }
    });
});

router.put("/:id", middleware.isAdmin, function (req, res) {
    var a = req.body.product.available;
    a ? req.body.product.available = true : req.body.product.available = false;
    Product.findByIdAndUpdate(req.params.id, req.body.product, function (err, updatedProduct) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            console.log(updatedProduct);
            res.redirect("/products");
        }
    });
});


router.delete("/:id", middleware.isAdmin, function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/products");
        } else {
            res.redirect("/products");
        }
    });
});

router.post("/:id/add-to-cart", middleware.isLoggedIn, function (req, res) {
    console.log(req.body.box);
    console.log(req.params.id);
    //eerst order zoeken indien geen => maken
    Order.findOne({
        "owner.id": req.user.id,
        status: 'active'
    }).populate("products.product").exec(function (err, foundOrder) {
        if (err) {
            console.log(err);

        } else {
            if (foundOrder == null) {
                Order.create({
                    status: "active",
                    totalPrice: 0
                }, function (err, order) {
                    order.owner.id = req.user._id;
                    order.owner.username = req.user.username;
                    Product.findById(req.params.id, function (err, foundProduct) {
                        if (err) {
                            console.log(err);
                        } else {
                            var prijs = parseInt(foundProduct.price) * parseInt(req.body.box);
                            var proBj = {
                                product: foundProduct,
                                aantal: req.body.box,
                                totaal: prijs
                            };
                            order.totalPrice = prijs;
                            order.products.push(proBj);
                            console.log(order.products);
                            order.save();
                            res.redirect("/products");
                        }
                    });

                });
            } else {
                var i = 0;
                var found = false;
                while (foundOrder.products[i] != null) {
                    console.log("product in while = " + foundOrder.products[i].product);
                    if (foundOrder.products[i].product._id == req.params.id) {
                        console.log("zit er in");
                        found = true;
                        //find and update
                        var aantal = parseInt(foundOrder.products[i].aantal);
                        aantal += parseInt(req.body.box);
                        foundOrder.products[i].aantal = aantal;
                        foundOrder.products[i].totaal = parseInt(foundOrder.products[i].totaal) + (parseInt(req.body.box) * parseInt(foundOrder.products[i].product.price));
                        foundOrder.totalPrice = parseInt(foundOrder.totalPrice) + (parseInt(req.body.box) * parseInt(foundOrder.products[i].product.price));
                        /*Order.findByIdAndUpdate(foundOrder._id,foundOrder,function(err,updated){
                            if(err){
                                console.log(err);
                            }else{
                                res.redirect("/products");
                            }
                        });*/
                        foundOrder.save();
                        res.redirect("/products");
                    }
                    i++;
                }
                if (!found) {
                    console.log("zit er niet in");
                    Product.findById(req.params.id, function (err, foundProduct) {
                        if (err) {
                            console.log(err);
                        } else {
                            var prijs = parseInt(foundProduct.price) * parseInt(req.body.box);
                            var proBj = {
                                product: foundProduct,
                                aantal: req.body.box,
                                totaal: prijs
                            };
                            foundOrder.totalPrice = parseInt(foundOrder.totalPrice) + (parseInt(req.body.box) * parseInt(foundProduct.price));
                            foundOrder.products.push(proBj);
                            //console.log(order.products);
                            foundOrder.save();
                            res.redirect("/products");
                        }
                    });
                }


            }

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