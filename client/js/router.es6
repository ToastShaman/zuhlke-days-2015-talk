import crossroads from 'crossroads';
import hasher from 'hasher';
import _ from 'lodash';

class Router {

    initialise() {
        hasher.initialized.add(_.bind(this.parseHash, this));
        hasher.changed.add(_.bind(this.parseHash, this));
        hasher.init();    
    } 

    parseHash(newHash, oldHash) {
      crossroads.parse(newHash);
    }

    addRoute(path, view) {
        let route = crossroads.addRoute(path, _.bind(view.render, view));
        route.switched.add(function() {
            view.unrender();
        });
    }

    currentHash() {
        hasher.getHash();    
    }

    goTo(name) {
        hasher.setHash(name);    
    }
}

export default new Router();