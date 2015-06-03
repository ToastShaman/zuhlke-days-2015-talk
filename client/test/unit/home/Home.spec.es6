import axios from 'axios';

import Auth from 'services/auth.es6';
import storage from 'services/storage.es6';
import events from 'services/events.es6';
import Home from 'home/home.es6';

describe('The Home View', function() {

  let auth, home;

  beforeEach(function() {
    auth = new Auth(axios, storage, events);
    home = new Home(auth, events);
  });

  it('should render', function() {
    home.render();
    expect(home.ractive).toBeDefined();
  });

});