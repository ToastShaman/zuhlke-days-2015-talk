process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var drop = require('./dropDatabase');
var localhost = require('../src/configuration').mongodb;
var User = require('../src/model/user');

describe('/sms/reply', function() {

  var app;

  beforeEach(function(done) {
    drop.mongo(localhost)
      .then(function() {
        app = require('../src/app.js');
      })
      .then(done)
      .catch(done);
  });

  it('should respond with a 200', function(done) {
    request(app)
      .post('/sms/reply')
      .set('Content-Type', 'application/json')
      .send({username: 'foobar@example.com'})
      .expect(200, done);
  });
  
});
