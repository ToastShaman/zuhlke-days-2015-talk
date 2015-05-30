import sinon from 'sinon';

import storage from 'services/storage.es6';
import httpBackend from 'services/httpBackend.es6';
import Http from 'services/http.es6';
import events from 'services/events.es6';
import Auth from 'services/auth.es6';

import authSuccessfulResponse from './auth-successful-response.es6';

describe('The Authorization Service', function() {

  let auth, http, server;

  beforeEach(function() {
    http = new Http(httpBackend, events);
    auth = new Auth(http, storage);
    server = sinon.fakeServer.create();
  });

  afterEach(function() {
    server.restore();
  });

  it('should authenticate a user successfully', function(done) {
    server.respondWith('POST', 'http://localhost:3000/login', authSuccessfulResponse);
    auth.login('username', 'password').then(function(user) {
      expect(storage.memory.get('user').firstname).toBe('John');
      expect(storage.local.get('accessToken')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
      expect(http.defaults.headers.common['X-Auth-Token']).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
      done();
    });
    server.respond();
  });
});