const express = require('express');
const passport = require('passport');
const router = express.Router();

const user = require('./user.js');
const room = require('./room.js');
const msg = require('./message.js');

router.use('/room', passport.authenticate('jwt', { session: false }), room);
router.use('/msg', passport.authenticate('jwt', { session: false }), msg);
router.use('/user', user);

module.exports = router;
