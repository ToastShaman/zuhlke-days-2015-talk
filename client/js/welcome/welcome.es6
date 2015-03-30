import Ractive from 'ractive';
import welcomeHtml from './welcome.ract';

export default class Welcome {
    
    constructor(router) {
        this.router = router;
    }

    render(name) {
        this.view = new Ractive({
            el: 'view',
            template: welcomeHtml,
            data: function() {
                return {
                    name: name
                };
            },
            oncomplete: this.oncomplete
        });
    }

    unrender() {
        return this.view.teardown();
    }

    oncomplete() {}
}