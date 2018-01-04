var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    products : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    date: {
        type: Date,
        default: Date.now
    },
    status: String,
    owner: String,
    totalPrice: String
});

var Order = mongoose.model("Order",orderSchema);
module.exports = Order;