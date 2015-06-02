import Parsely from 'parsleyjs'; // initialise Parsley
import Bootstrap from 'bootstrap'; // initialise Bootstrap

import Ractive from 'ractive';
Ractive.DEBUG = true;

import parsleyDecorator from './services/parsley-ractive-decorator.es6';
Ractive.decorators.parsley = parsleyDecorator;

import router from './services/router.es6';
import httpBackend from './services/httpBackend.es6';
import Http from './services/http.es6';
import events from './services/events.es6';
import store from './services/storage.es6';
import Auth from './services/auth.es6';

import Welcome from './welcome/welcome.es6';
import Home from './home/home.es6';
import Sorry from './sorry/sorry.es6';

let http = new Http(httpBackend, events);
let auth = new Auth(http, store);

router.addRoute('home', new Home(auth, router, http));
router.addRoute('sorry', new Sorry(router));
router.addRoute('welcome/{name}', new Welcome(router));
router.initialise();

auth.restoreLogin().then(function(user) {
  if (user) router.transitionTo('welcome/' + user.username);
  else router.transitionTo('home');
}, function(err) {
  if (err.status == -1) router.transitionTo('sorry');
  else router.transitionTo('home');
});
