import Ractive from 'ractive';
import html from './sorry.ract';

class Sorry {

  constructor(router) {
    this.router = router;
  }

  render() {
    this.ractive = new Ractive({
      el: 'view',
      template: html
    });
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Sorry;