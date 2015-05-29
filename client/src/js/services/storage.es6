import store from 'store';
import _ from 'lodash';

class InMemory {

  constructor() {
    this.store = {};
  }

  set(key, val) {
    this.store[key] = val;
  }

  get(key) {
    return this.store[key];
  }

  remove(key) {
    delete this.store[key];
  }
}

class Local {
  constructor() {
    this.store = store;
  }

  set(key, val) {
    this.store.set(key, val);
  }

  get(key) {
    return this.store.get(key);
  }

  remove(key) {
    this.store.remove(key);
  }
}

class Storage {

  constructor() {
    this.local = new Local();
    this.memory = new InMemory();
  }
}

export default Storage;