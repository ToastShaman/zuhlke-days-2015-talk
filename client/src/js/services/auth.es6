class Auth {

  constructor(axios, store, events) {
    this.store = store;
    this.axios = axios;
    this.events = events;
  }

  login(username, password) {
    let payload = (username && password) ? {username, password} : undefined;
    return this.axios.post('http://localhost:8080/login', payload).then((response) => {
      let accessToken = response.data.accessToken;
      let user = response.data.user;

      this.store.local.set('accessToken', accessToken);
      this.store.memory.set('user', user);

      return user;
    });
  }

  restoreLogin() {
    this.login().then(
      (user) => this.events.auth.restoredLogin.dispatch(user),
      (err) => this.events.auth.failedToRestoreLogin.dispatch(err));
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