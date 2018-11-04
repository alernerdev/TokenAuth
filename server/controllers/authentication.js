const jwt = require("jwt-simple");

const User = require("../models/user");
const keys = require("../config/keys");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // using user.id instead of email.  Email may change
    // subject and issued at time
    console.log(user);
    return jwt.encode({sub: user.id, iat:timestamp}, keys.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: "You must provide email and password" });

  // see if a user with a given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);

    // if exists, return an error
    if (existingUser) {
      // unprocessable entity
      return res.status(422).send({ error: "Email is in use" });
    }

    // if doesnt exist, create and save user record
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) return next(err);

      // respond to request indicating the user was created
      res.send({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  // user had already authed email/pwd; just need to produce token
  // user is hanging off the request because passport LocalStrategy
  // put it there
  res.send({token: tokenForUser(req.user)});
}