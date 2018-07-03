const express = require('express');
const router = express.Router();

const user = require('./user.js');
const room = require('./room.js');

router.use('/room', room);
router.use('/user', user);

module.exports = router;
