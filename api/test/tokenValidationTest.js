var should = require('should');
var request = require('supertest');
var app = require('../src/app.js');
var jwt = require('jsonwebtoken');

describe('/token/validate', function() {

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
