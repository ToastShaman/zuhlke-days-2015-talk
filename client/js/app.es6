import router from './router.es6';
import Welcome from './welcome/welcome.es6';
import Home from './home/home.es6';

router.addRoute('home', new Home(router));
router.addRoute('welcome/{name}', new Welcome(router));
router.initialise();

if (!router.currentHash()) {
    router.transitionTo('home');
}
