import Ractive from 'ractive';
import html from './home.ract';

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

        this.ractive.on('signIn', () => this.signIn());
    }

    signIn() {
        console.log(this.ractive.get('email'));
    }

    goToWelcomeScreen() {
        this.unrender().then(() => {
            this.router.transitionTo('/welcome/clicked');
        });
    }

    unrender() {
        return this.ractive.teardown();
    }
}

export default Home;