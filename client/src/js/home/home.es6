import Ractive from 'ractive';
import html from './home.ract'

class Home {

  constructor(auth, router, http) {
    this.router = router;
    this.http = http;
    this.auth = auth;
  }

  render() {
    this.auth.clearLogin();
    this.ractive = new Ractive({
      el: 'view',
      template: html,
      data: {
        showError: false
      }
    });

    this.ractive.on('signIn', () => {
      let username = this.ractive.get('email');
      let password = this.ractive.get('password');
      this.signIn(username, password);
    });
  }

  signIn(username, password) {
    this.auth.login(username, password)
      .then((user) => this.goToWelcomeScreen(user.username),
            (err) => this.showError());
  }

  showError() {
    this.ractive.set('showError', true);
  }

  goToWelcomeScreen(username) {
    this.unrender().then(() => this.router.transitionTo('/welcome/' + username));
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Home;