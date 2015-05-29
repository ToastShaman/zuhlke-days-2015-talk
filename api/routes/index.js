var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
  var accessToken = jwt.sign({foo: 'bar'}, 'shhhhh');

  res.json({
    accessToken: accessToken,
    user: {
      username: 'Kevin'
    }
  });

});

module.exports = router;
