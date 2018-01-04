var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Product = require('./models/product');
var Order = require("./models/order");
var User = require("./models/user");
var multer = require("multer");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var seedDB = require("./seeds");

//routes
var indexRoutes = require("./routes/index");
var productRoutes = require("./routes/products");
var orderRoutes = require("./routes/order");
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

//passport config
app.use(require("express-session")({
    secret: "Morgan Blue is The Best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//routes setup
app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/profile", profileRoutes);
app.use("/orders",orderRoutes);

app.listen(3000, function (req, res) {
    console.log("Server is started and listening on port 3000");
});