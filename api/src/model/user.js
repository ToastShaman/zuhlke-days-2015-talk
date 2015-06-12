var Promise = require('bluebird');
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    default: '',
    unique: true,
    required: 'Please fill in your username'
  },
  firstname: {
    type: String,
    trim: true,
    default: '',
    required: 'Please fill in your first name'
  },
  lastname: {
    type: String,
    trim: true,
    default: '',
    required: 'Please fill in your last name'
  },
  password: {
    type: String,
    default: '',
    required: 'Please fill in your password'
  },
  salt: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
  this.password = this.hashPassword(this.password);
  next();
});

UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  }
  return password;
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);
