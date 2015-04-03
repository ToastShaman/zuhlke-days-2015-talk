import Ractive from 'ractive';
import welcomeHtml from './welcome.ract';

class Welcome {

    constructor(router) {
        this.router = router;
    }

    render(name) {
        this.view = new Ractive({
            el: 'view',
            template: welcomeHtml,
            data: function () {
                return {
                    name: name
                };
            }
        });
    }

    unrender() {
        return this.view.teardown();
    }
}

export default Welcome;