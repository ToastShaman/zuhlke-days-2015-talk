import Ractive from 'ractive';
import html from './home.ract'

class Home {

  constructor(router, http) {
    this.router = router;
    this.http = http;
  }

  render() {
    this.ractive = new Ractive({
      el: 'view',
      template: html
    });

    this.ractive.on('signIn', () => {
      let username = this.ractive.get('email');
      let password = this.ractive.get('password');
      this.signIn(username, password);
    });
  }

  signIn(username, password) {
    this.http.post('login', {username, password}).then(() => {

    }, (error) => {
        console.log(this);
    });
  }

  goToWelcomeScreen() {
    this.unrender().then(() => this.router.transitionTo('/welcome/clicked'));
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Home;