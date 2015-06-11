import Ractive from 'ractive';
import html from './home.ract'

class Home {

  constructor(auth, events) {
    this.auth = auth;
    this.events = events;
  }

  render() {
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
      .then(user => this.goToWelcomeScreen(), err => this.showError(err));
  }

  showError(err) {
    this.ractive.set('showError', true);
  }

  goToWelcomeScreen() {
    this.events.routing.transitionTo.dispatch('welcome', this);
  }

  isProtected() {
    return false;
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Home;
