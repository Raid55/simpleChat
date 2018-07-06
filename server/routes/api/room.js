const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');
const User = mongoose.model('Users');

// api/room/:rid
router.get('/:rId', (req, res) => {
	const { rId } = req.params;

	if (req.user.roomsJoined.find(k => k.link === rId)) {
		Room.findOne({link: rId})
			.populate('messages.owner', 'username')
			.then(room => {
				res.status(201).json({
					success: true,
					room: room,
				});
				return room;
			})
			.catch(err => {
				console.log("api/room : ", err); /* eslint-disable-line babel/quotes */ // stings "" keys ''
				res.status(401).json({
					success: false,
					msg: "could not find room", /* eslint-disable-line babel/quotes */ // stings "" keys ''
				});
			});
	}
	else {
		let msg = {
			text: `${req.user.username} has joined the room...`,
			owner: req.user._id,
			type: 'joined',
		};

		Room.findOneAndUpdate({link: rId}, {$push: {messages: msg}}, {new: true})
			.populate('messages.owner', 'username')
			.then(room => {
				return Promise.all([room, User.findByIdAndUpdate(req.user._id, {$push: {roomsJoined: room._id}})]); // eslint-disable-line compat/compat
			})
			.then(re => {
				req.io.to(`room:${rId}`).emit('newMsg', re[0].messages[re[0].messages.length - 1]);
				res.status(201).json({
					success: true,
					room: re[0],
				});
				return re[1];
			})
			.catch(err => {
				console.log('api/room : ', err);
				res.status(401).json({
					success: false,
					msg: "could not find room or add room to user", /* eslint-disable-line babel/quotes */ // stings "" keys ''
				});
			});
	}
});

module.exports = router;
