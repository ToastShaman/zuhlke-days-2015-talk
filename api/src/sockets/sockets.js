var textMessage = require('./../events/textMessage');

var sockets = function(io) {
  textMessage.on('received', function(message) {
    io.emit('receivedSms', message);
  });
};

module.exports = sockets;
