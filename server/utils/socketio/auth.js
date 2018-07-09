const { TOKEN_SECRET, TOKEN_ISS } = require('../../../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

module.exports = (socket, next) => {
	let manErr = new Error('Authentication error');

	if (socket.handshake.query && socket.handshake.query.token) {
		jwt.verify(socket.handshake.query.token, TOKEN_SECRET, {issuer: TOKEN_ISS}, (err, token) => {
			if (err) {
				next(manErr);
			}
			else {
				User.findById(token.sub) // eslint-disable-line promise/no-promise-in-callback
					.then(user => {
						if (!user) {
							next(manErr); // eslint-disable-line promise/no-callback-in-promise
						}
						else {
							socket.userInfo = user;
							next(); // eslint-disable-line promise/no-callback-in-promise
						}
						return user;
					})
					.catch(err => {
						console.error("socket IO auth: ", err); /* eslint-disable-line babel/quotes */ // stings "" keys ''
						next(manErr); // eslint-disable-line promise/no-callback-in-promise
					});
			}
		});
	}
	else {
		next(manErr);
	}
};
