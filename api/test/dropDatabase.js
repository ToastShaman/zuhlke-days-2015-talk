var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

module.exports.mongo = function(connection) {
  return new Promise(function(resolve) {
    mongoose.connect(connection, function() {
      mongoose.connection.db.dropDatabase(resolve);
    });
  });
};
