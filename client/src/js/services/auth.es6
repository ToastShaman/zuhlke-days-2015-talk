class Auth {

  constructor(http, store, events, configuration) {
    this.store = store;
    this.http = http;
    this.events = events;
    this.configuration = configuration;
  }

  login(username, password) {
    let payload = (username && password) ? {username, password} : undefined;
    return this.http.post(this.configuration.api + '/login', payload).then((response) => {
      let accessToken = response.data.accessToken;
      let user = response.data.user;

      this.store.local.set('accessToken', accessToken);
      this.store.memory.set('user', user);

      return user;
    });
  }

  restoreLogin() {
    return this.login().then(
      (user) => this.events.auth.restoredLogin.dispatch(null, user),
      (err) => this.events.auth.restoredLogin.dispatch(err));
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