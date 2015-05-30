import Sorry from 'sorry/sorry.es6';

describe('The Sorry View', function() {

  it('should render', function() {
    let sorry = new Sorry();
    sorry.render();
    expect(sorry.ractive).toBeDefined();
  });

});