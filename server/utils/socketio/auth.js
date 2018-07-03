const { JWT_SECRET, TOKEN_ISS } = require('../../../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

module.exports = (socket, next) => {
  let manErr = new Error('Authentication error')

  if (socket.handshake.query && socket.handshake.query.token)
    jwt.verify(socket.handshake.query.token, JWT_SECRET, {issuer: TOKEN_ISS}, (err, token) => {
      if(err) 
        next(manErr);
      else
        User.findById(token.sub).exec()
          .then(user => {
            if (!user) {
              next(manErr);
            } else {
              socket.userInfo = user;
              next();
            }
          })
          .catch(err => {
            console.log("socket IO auth: ", err);
            next(manErr);
          });
    });
  else
    next(manErr);
}
