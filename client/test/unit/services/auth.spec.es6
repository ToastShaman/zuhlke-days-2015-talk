import axios from 'axios';

import Auth from 'services/auth.es6';
import storage from 'services/storage.es6';
import events from 'services/events.es6';

describe('The Authorization Service', function() {

  let auth;

  beforeEach(function() {
    auth = new Auth(axios, storage, events, {api: 'http://foobar.com'});
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should authenticate a user successfully', function(done) {
    jasmine.Ajax.stubRequest('http://foobar.com/login').andReturn({
      'status': 200,
      'contentType': 'application/json',
      'responseText': JSON.stringify({
        'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
        'user': {
          firstname: 'John'
        }
      })
    });

    auth.login('username', 'password').then(function(user) {
      expect(storage.memory.get('user').firstname).toBe('John');
      expect(storage.local.get('accessToken')).toBeDefined();
      done();
    });
  });
});