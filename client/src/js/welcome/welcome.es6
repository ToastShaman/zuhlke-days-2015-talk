import Ractive from 'ractive';
import html from './welcome.ract';
import navbar from '../navbar/navbar.ract';
import storage from '../services/storage.es6';

class Welcome {

  constructor(auth, events) {
    this.events = events;
    this.auth = auth;
  }

  render() {
    let loggedInUser = storage.memory.get('user');
    this.ractive = new Ractive({
      el: 'view',
      template: html,
      partials: {navbar: navbar},
      data: function() {
        return {
          user: loggedInUser,
          sms: []
        };
      }
    });

    this.ractive.on('logout', () => this.logout());
    this.events.sms.receivedSms.add((message) => this.ractive.push('sms', message));
  }

  logout() {
    this.auth.clearLogin();
    this.events.routing.transitionTo.dispatch('home', this);
  }

  isProtected() {
    return true;
  }

  unrender() {
    this.events.sms.receivedSms.removeAll();
    return this.ractive.teardown();
  }
}

export default Welcome;