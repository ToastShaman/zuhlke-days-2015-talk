var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var Schema = mongoose.Schema;

var TextMessage = new Schema({
  data: []
});

module.exports = mongoose.model('TextMessage', TextMessage, 'textMessages');
