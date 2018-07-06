const express = require('express');
const passport = require('passport');
const router = express.Router();



// api/create/user
router.post('/', (req, res, next) => {
  return passport.authenticate('signup', (err, token, userData) => {
    console.log(err, token, userData)
    if (err)
      return res.status(400).json({success: false});
    else if (!token)
      return res.status(400).json({success: false});
    else
      return res.status(201).json({
        success: true,
        token: token,
        user: userData,
      });
  })(req, res, next);
})

module.exports = router;
