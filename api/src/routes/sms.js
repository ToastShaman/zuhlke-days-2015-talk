var express = require('express');
var router = express.Router();

var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var textMessageEvent = require('../events/textMessage');
var TextMessage = require('../model/textMessage');

router.post('/reply', function(req, res, next) {
  new TextMessage({data: req.body}).saveAsync()
    .then(function(sms) {
      textMessageEvent.received(req.body);
      res.sendStatus(200);
    }).catch(next);
});

module.exports = router;
