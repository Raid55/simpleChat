const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');
const User = mongoose.model('Users');


// api/room/:rid
router.get('/:rId', (req, res) => {
  const { rId } = req.params;

  Room.findById(rId)
    .then(room => {

    })
    .catch(err => {
      console.log('api/room : ', err);
       
    })
  //  check if room exsists
  // check if user has alredy joined room, req.user
  // // if user has not
  // // emit new user joining to all channel,
  // // add room to users list
  // // else
  // send user room info
})

module.exports = router;
