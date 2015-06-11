var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var paperwork = require('paperwork');

var schema = {
  username: String,
  password: String
}

function invalidUsernameOrPassword() {
  var err = new Error('Invalid username/password');
  err.status = 401;
  return err;
}

function user(existingUser) {
  return {
    user: existingUser,
    accessToken: jwt.sign({username: existingUser.username}, 'secretKey')
  };
}

function findOne(username, db) {
  return db.findOne({'username': username});
}

router.post('/token/validate', function(req, res, next) {
  var accessToken = req.get('X-Auth-Token');
  var db = req.app.locals.users;

  if (accessToken) {
    jwt.verify(accessToken, 'secretKey', function(err, decoded) {

      if (err) return next(invalidUsernameOrPassword());
      var existingUser = findOne(decoded.username, db);
      if (existingUser) return res.json(user(existingUser));
      return next(invalidUsernameOrPassword());
    });
  } else return next(invalidUsernameOrPassword());
});

router.post('/login', paperwork.accept(schema), function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var db = req.app.locals.users;

  var existingUser = findOne(username, db);
  if (existingUser && existingUser.password === password)
    return res.json(user(existingUser));

  return next(invalidUsernameOrPassword());
});

module.exports = router;
