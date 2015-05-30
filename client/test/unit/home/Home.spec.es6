import Home from 'home/home.es6';
import store from 'services/storage.es6';
import Auth from 'services/auth.es6';
import router from 'services/router.es6';
import httpBackend from 'services/httpBackend.es6';
import Http from 'services/http.es6';
import events from 'services/events.es6';

let http = new Http(httpBackend, events);
let auth = new Auth(http, store);

describe('The Home View', function() {

  it('should render', function() {
    let home = new Home(auth, store, http);
    home.render();
    expect(home.ractive).toBeDefined();
  });

});