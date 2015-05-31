var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var existingUser = req.app.locals.users.find({'username': username});

  if (existingUser && existingUser.password === password) {
    return res.json(existingUser);
  }

  var err = new Error('Invalid username/password');
  err.status = 401;
  next(err);
});

module.exports = router;
