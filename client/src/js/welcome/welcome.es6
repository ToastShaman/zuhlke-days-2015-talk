import Ractive from 'ractive';
import html from './welcome.ract';
import navbar from '../navbar/navbar.ract';

class Welcome {

  constructor(router) {
    this.router = router;
  }

  render(name) {
    this.ractive = new Ractive({
      el: 'view',
      template: html,
      partials: {navbar: navbar},
      data: function() {
        return {
          name: name
        };
      }
    });

    this.ractive.on('logout', () => this.logout());
  }

  logout() {
    this.unrender().then(() => this.router.transitionTo('/home/'));
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Welcome;