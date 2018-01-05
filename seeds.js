var mongoose = require('mongoose');
var Product = require('./models/product');
var User = require("./models/user");

var data = [{
        name: "Kettingreiniger 5000cc",
        description: "Krachtige actieve reiniger en ontvetter voor het reinigen van ketting en versnellingsapparaat",
        price: "20",
        image: "https://www.aertsactionbike.be/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/h/chain_cleaner_5000cc.jpg",
        available: true
    },
    {
        name: "Kettingreiniger 1000cc",
        description: "Krachtige actieve reiniger en ontvetter voor het reinigen van ketting en versnellingsapparaat",
        price: "10",
        image: "https://www.bikecentredik.nl/wp-content/uploads/2017/01/Morgan-Blue-Kettingreiniger.jpg",
        available: true
    },
    {
        name: "Onderhoudskit Pro",
        description: "Compleet pakket aan producten en tools om uw fiets te poetsen en te onderhouden",
        price: "50",
        image: "https://www.fashionforcycling.be/6690-thickbox_default/morgan-blue-onderhoudskit-groot.jpg",
        available: false
    }
];

var userData = [{
        username: "glenngoossens",
        password: "glenn",
        email: "glenngoossens07@gmail.com",
        tag: "admin",
        address: "Zottegem"
    },
    {
        username: "test",
        password: "test",
        email: "glenngoossens07@gmail.com",
        tag: "user",
        address: "Zottegem"
    }
];


function seedDB() {
    Product.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("DATA cleared");
        }
        data.forEach(function (product) {
            Product.create(product, function (err, pr) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added product");
                }
            });
        });
    });
    User.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Users cleared");
        }
        userData.forEach(function (user) {
            User.register(new User({
                username: user.username,
                address: user.address,
                currentOrder: null,
                orders: null,
                email:user.email,
                tag:user.tag
            }), user.password, function (err, user) {
                if (err) {
                    console.log(err);
                }else{
                    console.log("added user " + user.username);
                }
            });
        });

    });
}

module.exports = seedDB;