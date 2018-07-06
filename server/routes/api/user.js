const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('Users');

// api/user
router.get('/', (req, res) => {
  res.status(201).json(req.user);
})

module.exports = router;
