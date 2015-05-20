import crossroads from 'crossroads';
import hasher from 'hasher';
import _ from 'lodash';
import Preconditions from "preconditions";
let preconditions = Preconditions.singleton();

class Router {

  initialise() {
    hasher.initialized.add(this.parseHash, this);
    hasher.changed.add(this.parseHash, this);
    hasher.init();
  }

  parseHash(newHash, oldHash) {
    crossroads.parse(newHash);
  }

  addRoute(path, view) {
    preconditions
      .shouldBeFunction(view.render)
      .shouldBeFunction(view.unrender);

    let route = crossroads.addRoute(path, _.bind(view.render, view));
    route.switched.add(function() {
      // unrender the view when the user clicks the back button
      view.unrender();
    });
  }

  currentHash() {
    return hasher.getHash();
  }

  transitionTo(path) {
    hasher.setHash(path);
  }
}

export default new Router();