const express = require('express');
const router = express.Router();

const generateName = require('sillyname');
const uuidv4 = require('uuid/v4');

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

// api/create/room
router.post('/', (req, res) => {
  
  let newRoom = new Room({
    name: generateName(),
    link: uuidv4().slice(0, 8),
    owner: req.user._id,
  })

  newRoom.save((err, room) => {
    if (err)
      res.status(400).json({
        success: false,
        msg: "Could not create room",
      })
    else
      res.status(201).json({
        success: true,
        room: room,
      })
  })

})

module.exports = router;
