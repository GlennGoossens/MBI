var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Product = require('./models/product');
var multer = require("multer");
var methodOverride = require("method-override");

var seedDB = require("./seeds");

//routes
var indexRoutes = require("./routes/index");
var productRoutes = require("./routes/products");
var profileRoutes = require("./routes/profile");

//DB
mongoose.connect('mongodb://localhost/MBI', {
    useMongoClient: true
});

//express setup
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//SEED
seedDB();

//routes setup
app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/profile", profileRoutes);


app.listen(3000, function (req, res) {
    console.log("Server is started and listening on port 3000");
});