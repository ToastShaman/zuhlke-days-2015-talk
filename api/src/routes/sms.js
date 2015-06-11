var express = require('express');
var router = express.Router();
var sms = require('../events/sms');

router.post('/reply', function(req, res, next) {
  var db = req.app.locals.sms;
  db.insert(req.body);
  sms.received(req.body);
  res.sendStatus(200);
});

module.exports = router;
