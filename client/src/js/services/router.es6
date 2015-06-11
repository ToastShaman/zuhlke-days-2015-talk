import crossroads from 'crossroads';
import hasher from 'hasher';
import _ from 'lodash';

class Router {

  constructor(auth, events) {
    this.auth = auth;
    this.events = events;
    this.initialised = false;
  }

  initialise() {
    hasher.initialized.add(this.parseHash);
    hasher.changed.add(this.parseHash);
    hasher.init();

    crossroads.bypassed.add(() => this.bypassedHandler());
  }

  parseHash(newHash, oldHash) {
    crossroads.parse(newHash);
  }

  addRoute(path, view) {
    let route = crossroads.addRoute(path, _.bind(view.render, view));
    route.matched.add(() => this.matchedHandler(path, view));
    route.switched.add(() => this.switchedHandler(view));
  }

  bypassedHandler() {
    this.events.routing.notFound.dispatch();
  }

  switchedHandler(view) {
    view.unrender();
  }

  matchedHandler(path, view) {
    if (view.isProtected() && !this.auth.loggedInUser()) {
      view.unrender().then(() => this.events.routing.accessDenied.dispatch(path));
    }
  }

  currentHash() {
    return hasher.getHash();
  }

  transitionTo(path) {
    hasher.setHash(path);
  }
}

export default Router;
