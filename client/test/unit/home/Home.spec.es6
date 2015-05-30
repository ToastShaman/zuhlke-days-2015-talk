import Home from 'home/home.es6';

describe('The Home View', function() {

  it('should render', function() {
    let home = new Home();
    home.render();
    expect(home.ractive).toBeDefined();
  });

});