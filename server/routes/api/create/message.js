const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

// api/create/msg/:rId
router.post('/:rId', (req, res) => {
	const { rId } = req.params;

	if (req.user.roomsJoined.find(k => k.link === rId) && req.body.text) {
		let msg = {
			text: req.body.text,
			owner: req.user._id,
			type: 'text',
    }
    Room.findOneAndUpdate({link: rId}, {$push: {messages: msg}}, {new: true})
      .populate('messages.owner', 'username')
      .then(room => {
        res.status(201).json({
          success: true,
        });
        req.io.to(`room:${rId}`).emit('newMsg', room.messages[room.messages.length - 1]);
      })
      .catch(err => {
        console.log("api/create/msg: ", err);
        res.status(400).json({
          success: false,
          msg: "could not create msg",
        });
      })
  }
  else {
    res.status(401).json({
      success: false,
      msg: "user not part of room",
    })
  }
})

module.exports = router;
