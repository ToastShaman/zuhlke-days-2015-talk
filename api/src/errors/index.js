var util = require('util');

function HttpError(status, message) {
  Error.call(this);
  this.message = message;
  this.status = status;
}
util.inherits(HttpError, Error);

module.exports = HttpError;
