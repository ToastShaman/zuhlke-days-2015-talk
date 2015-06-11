import Immutable from 'immutable';

class Auth {

  constructor(http, store, events, configuration) {
    this.store = store;
    this.http = http;
    this.events = events;
    this.configuration = configuration;
  }

  /**
   * @returns {Promise<Immutable.Map<User>>}
   */
  login(username, password) {
    let payload = (username && password) ? {username, password} : undefined;
    return this.http.post(this.configuration.api + '/login', payload)
      .then(response => this.storeUser(response));
  }

  restoreLogin() {
    return this.http.post(this.configuration.api + '/token/validate')
      .then(response => this.storeUser(response))
      .then(user => this.events.auth.restoredLogin.dispatch(null, user))
      .catch(err => this.events.auth.restoredLogin.dispatch(err));
  }

  storeUser(response) {
    let accessToken = response.data.accessToken;
    let user = Immutable.fromJS(response.data.user);

    this.store.local.set('accessToken', accessToken);
    this.store.memory.set('user', user);

    return user;
  }

  clearLogin() {
    this.store.local.remove('accessToken');
    this.store.memory.remove('user');
  }

  loggedInUser() {
    return this.store.memory.get('user');
  }
}

export default Auth;
