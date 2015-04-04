import Ractive from 'ractive';
import html from './home.ract';

class Home {

    constructor(router, http) {
        this.router = router;
        this.http = http;
    }

    render() {
        this.view = new Ractive({
            el: 'view',
            template: html
        });

        this.view.on('activate', () => this.goToWelcomeScreen());
    }

    goToWelcomeScreen() {
        this.unrender().then(() => {
            this.router.transitionTo('/welcome/clicked');
        });
    }

    unrender() {
        return this.view.teardown();
    }
}

export default Home;