var express = require("express");
var router = express.Router();
var Order = require("../models/order");
var middleware = require("../middleware");

//home
router.get("/",middleware.isLoggedIn, function (req, res) {
    res.render("orders/index");
  
});


module.exports = router;