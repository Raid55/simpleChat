const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

// api/create/msg/:rId
router.post('/:rId', (req, res) => {
	const { rId } = req.params;
	const { text } = req.body;

	if (req.user.roomsJoined.find(k => k.link === rId) && (text && typeof text === "string")) {
		let msg = {
			text: text,
			owner: req.user._id,
			type: 'text',
		};

		Room.findOneAndUpdate({link: rId}, {$push: {messages: msg}}, {new: true})
			.populate('messages.owner', 'username')
			.then(room => {
				res.status(201).json({
					success: true,
				});
				req.io.to(`room:${rId}`).emit('newMsg', room.messages[room.messages.length - 1]);
				return room;
			})
			.catch(err => {
				console.log("api/create/msg: ", err); /* eslint-disable-line babel/quotes */ // stings "" keys ''
				res.status(401).json({
					success: false,
					msg: "could not create msg", /* eslint-disable-line babel/quotes */ // stings "" keys ''
				});
			});
	}
	else {
		res.status(400).json({
			success: false,
			msg: "user not part of room", /* eslint-disable-line babel/quotes */ // stings "" keys ''
		});
	}
});

module.exports = router;
