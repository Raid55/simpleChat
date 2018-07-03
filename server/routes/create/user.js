const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return passport.authenticate('signup', (err, token, userData) => {
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
