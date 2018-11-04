const passport = require('passport');

const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

// by default, passport wants to create a cookie based session
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

// requireAuth is the middleware  that sits between the request and protected route

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'});
    });
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin);
}