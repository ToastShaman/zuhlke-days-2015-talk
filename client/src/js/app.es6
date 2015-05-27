import jquery from 'jquery';
window['$'] = window['jQuery'] = jquery;

import parsleyjs from 'parsleyjs';
import Bootstrap from 'bootstrap';
import Ractive from 'ractive';
Ractive.DEBUG = true;

import parsleyDecorator from './services/parsley-ractive-decorator.es6';
Ractive.decorators.parsley = parsleyDecorator;

import router from './router.es6';
import httpBackend from './services/httpBackend.es6';
import Http from './services/http.es6';
import events from './services/events.es6';

import Welcome from './welcome/welcome.es6';
import Home from './home/home.es6';

let http = new Http(httpBackend, events);

router.addRoute('home', new Home(router, http));
router.addRoute('welcome/{name}', new Welcome(router));
router.initialise();

if (!router.currentHash()) {
  router.transitionTo('home');
}