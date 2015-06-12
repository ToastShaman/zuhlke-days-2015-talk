var util = require('util');
var events = require('events');

function SMS() {
  events.EventEmitter.call(this);
}

util.inherits(SMS, events.EventEmitter);

SMS.prototype.received = function(message) {
  this.emit('received', message);
};

module.exports = new SMS();