import Ractive from 'ractive';

export default class Home {
    render() {
        this.view = new Ractive({
            el: 'view',
            template: require('./home.ract'),
            data: function() {
                return {
                    name: 'Kevin'
                };
            },
            oncomplete: this.oncomplete
        });
    }

    unrender() {
        return this.view.teardown();
    }

    oncomplete() {
    }
}