var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var paperwork = require('paperwork');
var _ = require('lodash');

var schema = {
  username: String,
  password: String
}

router.post('/token/validate', function(req, res, next) {
  var accessToken = req.get('X-Auth-Token');
  var db = req.app.locals.users;
  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, 'secretKey', function(err, decoded) {
      if (err) return res.sendStatus(401);
      var existingUser = db.findOne({'username': decoded.username});
      if (existingUser) return res.json(halItem(existingUser));
      return res.sendStatus(401);
  });
});

router.post('/login', paperwork.accept(schema), function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var db = req.app.locals.users;

  var existingUser = db.findOne({'username': username});
  if (existingUser && existingUser.password === password)
    return res.json(halItem(existingUser));
  return res.sendStatus(401);
});

function halItem(item) {
  var self = '/users/' + item.username;
  return {
      _links: {
          self: {href: self}
      },
      user: _.omit(item, ['meta', '$loki']),
      accessToken: jwt.sign({username: item.username}, 'secretKey')
  };
}

module.exports = router;
