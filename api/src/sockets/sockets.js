var sms = require('./../events/sms');

var sockets = function(io) {
  sms.on('received', function(message) {
    io.emit('receivedSms', message);
  });
};

module.exports = sockets;
