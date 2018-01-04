var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    orders:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }],
    address: String,
    currentOrder: String

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);