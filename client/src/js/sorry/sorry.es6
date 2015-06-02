import Ractive from 'ractive';
import html from './sorry.ract';

class Sorry {

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

export default Sorry;