process.env.NODE_ENV = 'test';

var should = require('should');
var request = require('supertest');
var drop = require('./dropDatabase');
var localhost = require('../src/configuration').mongodb;
var User = require('../src/model/user');

describe('/login', function() {

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

  it('should respond with a 400 if the posted data is not confirming to the schema', function(done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({username: 'foobar@example.com'})
      .expect(400, done);
  });

  it('should respond with a 200', function(done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({username: 'arthur@nudge.com', password: 'password'})
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should respond with a 200 and an auth token', function(done) {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({username: 'arthur@nudge.com', password: 'password'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('accessToken');
        done();
      });
  });

});
