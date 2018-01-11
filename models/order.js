var mongoose = require('mongoose');
var shortid = require("shortid");
var orderSchema = new mongoose.Schema({
    _id:{
        type:String,
        'default':shortid.generate
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        aantal: Number,
        totaal: Number
    }],
    date: {
        type: Date,
        default: Date.now
    },
    status: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    totalPrice: Number
});


var Order = mongoose.model("Order", orderSchema);
module.exports = Order;