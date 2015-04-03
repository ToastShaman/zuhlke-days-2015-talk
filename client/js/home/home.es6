import Ractive from 'ractive';

class Home {

    constructor(router, http) {
        this.router = router;
        this.http = http;
    }

    render() {
        this.view = new Ractive({
            el: 'view',
            template: require('./home.ract')
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