const express = require('express');
const router = express.Router();

// api/user
router.get('/', (req, res) => {
	res.status(201).json({
		success: true,
		user: {
			username: req.user.username,
			roomsJoined: req.user.roomsJoined,
		},
	});
});

module.exports = router;
