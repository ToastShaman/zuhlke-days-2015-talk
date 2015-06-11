var sms = require('./../events/sms');

var sockets = function(io) {
  io.on('connection', function(socket) {
    sms.on('received', function(message) {
      socket.emit('receivedSms', message);
    })
  });
};

module.exports = sockets;