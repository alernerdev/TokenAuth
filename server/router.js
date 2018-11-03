const passport = require('passport');

const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
}