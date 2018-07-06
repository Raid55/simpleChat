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
  })

  newRoom.save((err, room) => {
    if (err) {
      console.log("/create/room creating room ", err);
      res.status(400).json({
        success: false,
        msg: "Could not create room",
      })
    }
    else {
      User.findByIdAndUpdate(req.user._id, {$push: {roomsJoined: room._id}})
        .then(user => {
          res.status(201).json({
            success: true,
            room: room,
          })
        })
        .catch(err => {
          console.log("/create/room add to user: ", err);
          res.status(400).json({
            success: false,
            msg: "Could not add room to user",
          })
        });
    }
  })

})

module.exports = router;
