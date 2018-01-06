var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    image: String,
    available: Boolean,
    box: Number
});

var Product = mongoose.model("Product",productSchema);
module.exports = Product;