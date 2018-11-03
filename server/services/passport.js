const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require("../models/user");
const keys = require("../config/keys");

// have to tell the library where to pickup username from
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify username / password
  // if confirmed, call done with user; otherwise call done with false
});

const jwtOptions = {
    // got to tell the library where to find jwt tokens on incoming requests
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // got to tell the library how to decode the incoming tokens
    secretOrKey: keys.secret
};

// Create JWT strategy
// payload is decoded jwt token
// done is a callback function
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user ID from payload exists in the database
  User.findById(payload.subdomains, function(err, user) {
    if (err) return done(err, false);

    // if so, call done with the user; else, call done without user
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use the above strategy
passport.use(jwtLogin);