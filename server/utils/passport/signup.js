const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

const { TOKEN_SECRET, TOKEN_EXP, TOKEN_ISS } = require('../../../config');

const maxCharsUser = 18; // max chars for user creation

module.exports = new PassportLocalStrategy({
	usernameField: 'username',
	passwordField: 'username',
	session: false,
	passReqToCallback: true,
}, (req, username, password, done) => {
	if (username.length > maxCharsUser) {
		done(new Error("user name length over 18 chars"));
	}
	else {
		const newUser = new User({
			username: username,
			ipAddress: req.connection.remoteAddress,
			userAgent: req.headers['user-agent'],
		});

		newUser.save((err, user) => {
			if (err) {
				console.error("signup-strat: ", err);
				done(err);
			}
			else {
				const token = jwt.sign({ sub: user._id }, TOKEN_SECRET, {
					expiresIn: TOKEN_EXP,
					issuer: TOKEN_ISS,
				});
				done(null, token, newUser);
			}
		});
	}
});
