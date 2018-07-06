const express = require('express');
const router = express.Router();

const generateName = require('sillyname');
const uuidv4 = require('uuid/v4');

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');
const User = mongoose.model('Users');

// api/create/room
router.post('/', (req, res) => {
	let newRoom = new Room({
		name: generateName(),
		link: uuidv4().slice(0, 8),
		owner: req.user._id,
	});

	newRoom.save()
		.then(room => {
			return Promise.all([room, User.findByIdAndUpdate(req.user._id, {$push: {roomsJoined: room._id}})]); // eslint-disable-line compat/compat
		})
		.then(re => {
			res.status(201).json({
				success: true,
				room: re[0],
			});
			return re[1];
		})
		.catch(err => {
			console.log("/create/room : ", err); /* eslint-disable-line babel/quotes */ // stings "" keys ''
			res.status(400).json({
				success: false,
				msg: "Could not save room add/or room to user", /* eslint-disable-line babel/quotes */ // stings "" keys ''
			});
		});
});

module.exports = router;
