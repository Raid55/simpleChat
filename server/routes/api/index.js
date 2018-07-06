const express = require('express');
const passport = require('passport');
const router = express.Router();

const create = require('./create');
const room = require('./room.js');
const user = require('./user.js');

// Status...
router.get('/status', (req, res) => {
	res.send({ status: "ok", code: 201 }); /* eslint-disable-line babel/quotes */ // stings "" keys ''
});

router.use('/create', create);
router.use('/room', passport.authenticate('jwt', { session: false }), room);
router.use('/user', passport.authenticate('jwt', { session: false }), user);

module.exports = router;
