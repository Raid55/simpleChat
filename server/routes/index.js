const express = require('express');
const router = express.Router();

const create = require('./create');
const room = require('./room.js');

// Status...
router.get('/status', (req, res) => {
  res.send({ status: "ok", code: 201 });
})

router.use('/create', create);
router.use('/room', room);

module.exports = router;
