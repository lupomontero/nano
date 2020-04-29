import createElement from '../createElement';

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
