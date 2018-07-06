const express = require('express');
const router = express.Router();

// api/user
router.get('/', (req, res) => {
	res.status(201).json(req.user);
});

module.exports = router;
