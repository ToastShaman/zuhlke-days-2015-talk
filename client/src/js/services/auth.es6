class Auth {

  constructor(http, store, events) {
    this.store = store;
    this.http = http;
    this.events = events;
  }

  login(username, password) {
    let payload = (username && password) ? {username, password} : undefined;
    return this.http.post('http://localhost:8080/login', payload).then((response) => {
      let accessToken = response.data.accessToken;
      let user = response.data.user;

      this.store.local.set('accessToken', accessToken);
      this.store.memory.set('user', user);
      this.http.defaults.headers.common['X-Auth-Token'] = accessToken;

      return user;
    });
  }

  restoreLogin() {
    let accessToken = this.store.local.get('accessToken');
    if (accessToken) {
      this.http.defaults.headers.common['X-Auth-Token'] = accessToken;
    }
    this.login().then(
      (user) => this.events.auth.restoredLogin.dispatch(user),
      (err) => this.events.auth.failedToRestoreLogin.dispatch(err));
  }

  clearLogin() {
    delete this.http.defaults.headers.common['X-Auth-Token'];
    this.store.local.remove('accessToken');
    this.store.memory.remove('user');
  }

  loggedInUser() {
    return this.store.memory.get('user');
  }
}

export default Auth;