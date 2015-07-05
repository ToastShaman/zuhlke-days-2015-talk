process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var drop = require('./dropDatabase');
var localhost = require('../src/configuration').mongodb;
var User = require('../src/model/user');
var jwt = require('jsonwebtoken');

describe('/token/validate', function() {

  var app;

  beforeEach(function(done) {
    drop.mongo(localhost)
      .then(function() {
        return new User({
          username: 'arthur@nudge.com',
          firstname: 'Arthur',
          lastname: 'Nudge',
          password: 'password'
        }).saveAsync();
      })
      .then(function() {
        app = require('../src/app.js');
      })
      .then(done)
      .catch(done);
  });

  it('should respond with a 401 if there is no token', function(done) {
    request(app)
      .post('/token/validate')
      .set('Content-Type', 'application/json')
      .send()
      .expect(401, done);
  });

  it('should respond with a 401 if the token is invalid', function(done) {
    var accessToken = jwt.sign({username: 'arthur@nudge.com'}, 'foobar');

    request(app)
      .post('/token/validate')
      .set('Content-Type', 'application/json')
      .set('X-Auth-Token', accessToken)
      .send()
      .expect(401, done);
  });

  it('should respond with a 200 if the token is valid', function(done) {
    var accessToken = jwt.sign({username: 'arthur@nudge.com'}, 'secretKey')

    request(app)
      .post('/token/validate')
      .set('Content-Type', 'application/json')
      .set('X-Auth-Token', accessToken)
      .send()
      .expect(200, done);
  });

});
