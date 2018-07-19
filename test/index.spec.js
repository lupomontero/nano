const { render, createElement } = require('../');


describe('render', () => {
  it('should be a function', () => {
    expect(typeof render).toBe('function');
  });

  it('should render component in given target', () => {
    const Component = () => document.createElement('div');
    const target = document.createElement('div');
    expect(render(Component, target)).toBeUndefined();
    expect(target.children.length).toBe(1);
    expect(target.children[0] instanceof HTMLDivElement).toBe(true);
  });

  it('should empty target before rendering', () => {
    const Component = () => document.createElement('div');
    const target = document.createElement('div');
    expect(render(Component, target)).toBeUndefined();
    expect(target.children.length).toBe(1);
    expect(target.children[0] instanceof HTMLDivElement).toBe(true);

    expect(render(Component, target)).toBeUndefined();
    expect(target.children.length).toBe(1);
    expect(target.children[0] instanceof HTMLDivElement).toBe(true);
  });

  it('should not append when component returns falsy value', () => {
    const target = document.createElement('div');
    expect(render(() => null, target)).toBeUndefined();
    expect(target.children.length).toBe(0);
  });
});


describe('createElement', () => {
  it('should be a function', () => {
    expect(typeof createElement).toBe('function');
  });

  it('should create DOM element of given tagName', () => {
    // console.log(createElement());
    // console.log(createElement(undefined));
    // console.log(createElement(null));
    // console.log(createElement(''));
    expect(createElement('span') instanceof HTMLSpanElement).toBe(true);
    expect(createElement('div') instanceof HTMLDivElement).toBe(true);
  });

  it('should add children', () => {
    const el = createElement('div', {
      children: [createElement('span', { className: 'inner' })],
    });
    expect(el instanceof HTMLDivElement).toBe(true);
    expect(el.children.length).toBe(1);
    expect(el.children[0] instanceof HTMLSpanElement).toBe(true);
    expect(el.children[0].className).toBe('inner');
  });
});
