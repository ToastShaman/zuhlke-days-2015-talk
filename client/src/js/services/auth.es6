class Auth {

  constructor(http, store) {
    this.store = store;
    this.http = http;
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
    return this.login();
  }

  clearLogin() {
    delete this.http.defaults.headers.common['X-Auth-Token'];
    this.store.local.remove('accessToken');
    this.store.memory.remove('user');
  }
}

export default Auth;