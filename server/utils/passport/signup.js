const PassportLocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const { TOKEN_SECRET, TOKEN_EXP, ISS } = require('../../../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  // passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  const newUser = new User({
    username: username, 
    ip_address: req.connection.remoteAddress,
  });

  newUser.save((err, info) => {
    if (err) {
      console.log("signup-strat: ", err);
      done(err);
    }
    else {
      const token = jwt.sign({ sub: user._id }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXP,
        issuer: ISS,
      });
      done(null, token, newUser);
    }
  });

});
