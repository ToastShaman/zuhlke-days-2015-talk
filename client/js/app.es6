import router from './router.es6';
import Welcome from './welcome/welcome.es6';
import Home from './home/home.es6';

import httpBackend from './services/httpBackend.es6';
import Http from './services/http.es6';

router.addRoute('home', new Home(router));
router.addRoute('welcome/{name}', new Welcome(router));
router.initialise();

if (!router.currentHash()) {
    router.transitionTo('home');
}

var http = new Http(httpBackend);
setTimeout(function () {
    http.get('http://jsonplaceholder.typicode.com/albums').then(function (response) {
        console.log(response.data);
    });
}, 5000);
