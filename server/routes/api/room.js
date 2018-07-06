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
        })
      })
      .catch(err => {
        console.log('api/room : ', err);
        res.status(401).json({
          success: false,
          msg: "could not find room",
        })
      });
  }
  else {
    let msg = {
      text: `${req.user.username} has joined the room...`,
      owner: req.user._id,
      type: 'joined',
    }
    Room.findOneAndUpdate({link: rId}, {$push: {messages: msg}}, {new: true})
      .populate('messages.owner', 'username')
      .then(room => {
        User.findByIdAndUpdate(req.user._id, {$push: {roomsJoined: room._id}})
          .then(user => {
            req.io.to(`room:${rId}`).emit('newMsg', room.messages[room.messages.length - 1]);
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
      })
      .catch(err => {
        console.log('api/room : ', err);
        res.status(401).json({
          success: false,
          msg: "could not find room",
        })
      });
  }

})

module.exports = router;
