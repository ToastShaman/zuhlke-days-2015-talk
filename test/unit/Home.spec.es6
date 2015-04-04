import Home from '../../client/js/home/home.es6';

describe('the home view', function() {

    it('should render', function() {
        let home = new Home();
        home.render();
        expect(home.view).toBeDefined();
    });

});