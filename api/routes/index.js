var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  if (username === 'arthur@nudge.com' && password === 'password') {
    var accessToken = jwt.sign({foo: 'bar'}, 'shhhhh');
    return res.json({
      accessToken: accessToken,
      user: {
        username: 'arthur@nudge.com',
        firstname: 'Arthur',
        lastname: 'Nudge'
      }
    });
  }

  res.send(401);

});

module.exports = router;
