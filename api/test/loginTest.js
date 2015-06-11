var should = require('should');
var request = require('supertest');
var app = require('../src/app.js');

describe('GET /login', function() {

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

  it('should respond with a 200 and a auth token', function(done) {
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
