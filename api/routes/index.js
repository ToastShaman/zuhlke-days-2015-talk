var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var accessToken = req.get('X-Auth-Token');

  if (accessToken) {
    try {
      var decoded = jwt.verify(accessToken, 'secretKey');
      var existingUser = req.app.locals.users.findOne({'username': decoded.username});
      return res.json({
        user: existingUser,
        accessToken: jwt.sign({username: existingUser.username}, 'secretKey')
      });
    } catch (err) {}
  } else {
    var existingUser = req.app.locals.users.findOne({'username': username});
    if (existingUser && existingUser.password === password) {
      return res.json({
        user: existingUser,
        accessToken: jwt.sign({username: existingUser.username}, 'secretKey')
      });
    }
  }

  var err = new Error('Invalid username/password');
  err.status = 401;
  next(err);
});

module.exports = router;
