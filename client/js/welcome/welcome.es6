import Ractive from 'ractive';
//import html from './welcome.ract';

class Welcome {

    constructor(router) {
        this.router = router;
    }

    render(name) {
        this.view = new Ractive({
            el: 'view',
            //template: html,
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