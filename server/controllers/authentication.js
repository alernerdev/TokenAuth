const User = require('../models/user');

exports.signup = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // see if a user with a given email exists
    User.findOne({email: email}, function(err, existingUser) {

    });

    // if exists, return an error

    // if doesnt exist, create and save user record

    // respond to request indicating the user was created
    res.send({success:true});
}