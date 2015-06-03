import Ractive from 'ractive';
import html from './404.ract';

class NotFound {

  render() {
    this.ractive = new Ractive({
      el: 'view',
      template: html
    });
  }

  isProtected() {
    return false;
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default NotFound;