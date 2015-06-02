import Logdown  from 'logdown';

import Parsely from 'parsleyjs'; // initialise Parsley
import Bootstrap from 'bootstrap'; // initialise Bootstrap

import Ractive from 'ractive';
Ractive.DEBUG = true;

import parsleyDecorator from './services/parsley-ractive-decorator.es6';
Ractive.decorators.parsley = parsleyDecorator;

import Router from './services/router.es6';
import events from './services/events.es6';
import storage from './services/storage.es6';
import Auth from './services/auth.es6';
import axios from 'axios';

import Welcome from './welcome/welcome.es6';
import Home from './home/home.es6';
import Sorry from './sorry/sorry.es6';

let logger = new Logdown({prefix: 'app'});
let auth = new Auth(axios, storage, events);
let router = new Router(auth, events);

axios.interceptors.request.use(function(config) {
  let accessToken = storage.local.get('accessToken');
  if (accessToken) config.headers['X-Auth-Token'] = accessToken;
  else delete config.headers['X-Auth-Token'];
  return config;
});

router.addRoute('home', new Home(auth, events));
router.addRoute('sorry', new Sorry());
router.addRoute('welcome', new Welcome(auth, events));
router.initialise();

auth.restoreLogin();

events.auth.restoredLogin.add(function(user) {
  logger.log('the login credentials have been restored');
  router.transitionTo('welcome');
});

events.auth.failedToRestoreLogin.add(function(err) {
  logger.warn('a failed login attempt has been made');
  router.transitionTo('home');
});

events.routing.accessDenied.add(function(path) {
  logger.warn('the access to `' + path + '` has been denied');
  router.transitionTo('home');
});

events.routing.notFound.add(function() {
  logger.log('the entered path could not be found');
  router.transitionTo('sorry');
});

events.routing.transitionTo.add(function(path, view) {
  logger.log('transitioning to `' + path + '`');
  view.unrender().then(function() {
    router.transitionTo(path);
  });
});
