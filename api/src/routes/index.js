var express = require('express');
var router = express.Router();

var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var jwt = require('jsonwebtoken');
var paperwork = require('paperwork');
var _ = require('lodash');

var User = require('../model/user');

var schema = {
  username: String,
  password: String
}

router.post('/token/validate', function(req, res, next) {
  var accessToken = req.get('X-Auth-Token');
  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, 'secretKey', function(err, decodedToken) {
    if (err) return res.sendStatus(401);

    User.findOneAsync({'username': decodedToken.username})
      .then(function(existingUser) {
        if (!existingUser) return res.sendStatus(401);
        res.json(halItem(existingUser));
      }).catch(function(err) {
        res.sendStatus(500);
      });
  });
});

router.post('/login', paperwork.accept(schema), function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOneAsync({'username': username})
    .then(function(existingUser) {
      if (!existingUser) return res.sendStatus(401);
      if (!existingUser.authenticate(password)) return res.sendStatus(401);
      return res.json(halItem(existingUser));
    }).catch(function(err) {
      res.sendStatus(500);
    });
});

function halItem(item) {
  var self = '/users/' + item.username;
  return {
      _links: {
          self: {href: self}
      },
      user: {
          id: item._id,
          firstname: item.firstname,
          lastname: item.lastname,
          username: item.username 
      },
      accessToken: jwt.sign({username: item.username}, 'secretKey')
  };
}

module.exports = router;
