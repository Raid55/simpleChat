const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { TOKEN_SECRET, TOKEN_ISS } = require('../../../config');

const mongoose = require('mongoose');
const User = mongoose.model('Users');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET,
  issuer: TOKEN_ISS,
}

module.exports = new JwtStrategy(opts, (token, done) => {
  User.findById(token.sub)
  .populate('roomsJoined', 'isActive name link owner _id')
  .exec().then(user => {
    if (user)
      done(null, user);
    else
      done(null, false);
  })
  .catch(err => {
    console.log("jwt-strat", err);
    done(err, false);
  });
});
