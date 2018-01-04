var express = require("express");
var router = express.Router();
var Order = require("../models/order");

//home
router.get("/", function (req, res) {
    res.render("orders/index");
  
});


module.exports = router;