const express = require('express');
const passport = require('passport');
const router = express.Router();

const create = require('./create');
const room = require('./room.js');
const user = require('./user.js');

// Status...
router.get('/status', (req, res) => {
	res.status(200).send({ message: "all is ok...", code: 200 }); /* eslint-disable-line babel/quotes */ // stings "" keys ''
});

router.use('/create', create);
router.use('/room', passport.authenticate('jwt', { session: false }), room);
router.use('/user', passport.authenticate('jwt', { session: false }), user);

router.all('/*', (req, res) => {
	res.status(404).send({ message: "this is not a valid endpoint...", code: 404 }); /* eslint-disable-line babel/quotes */ // stings "" keys ''
});

module.exports = router;
