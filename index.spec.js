const { render, createElement, compose } = require('./index');


describe('render', () => {

  it('should...', () => {
    // ...
  });

});


describe('createElement', () => {

  it('should...', () => {
    // ...
  });

});


describe('compose', () => {

  it('should compose functions', () => {
    const fn1 = jest.fn().mockImplementation((arg) => {
      return [...arg, true];
    });
    const fn2 = jest.fn().mockImplementation((arg) => {
      return [...arg, true];
    });
    const fn3 = jest.fn().mockImplementation((...args) => {
      return [...args, true];
    });

    expect(compose(fn1, fn2, fn3)(1, 2, 3)).toEqual([ 1, 2, 3, true, true, true ]);
  });

});
