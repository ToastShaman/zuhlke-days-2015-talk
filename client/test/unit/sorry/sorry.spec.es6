import Sorry from 'sorry/sorry.es6';

describe('The Sorry View', function() {

  let sorry;

  beforeEach(function() {
    sorry = new Sorry();
  });

  it('should render', function() {
    sorry.render();
    expect(sorry.ractive).toBeDefined();
  });

});