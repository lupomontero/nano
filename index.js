//
// Render component into given DOM Node
//
export const render = (component, root) => {
  root.innerHTML = '';
  root.appendChild(component({}));
}


//
// Create DOM Element
//
export const createElement = (tagName, opts = {}) => {
  const { children, ...rest } = opts;
  const element = Object.assign(document.createElement(tagName), rest);
  if (children && typeof children.forEach === 'function') {
    children.filter(item => item).forEach(element.appendChild.bind(element));
  }
  return element;
};


//
// See redux#compose
//
export const compose =
  (...fns) =>
    (...args) =>
      fns.slice(0, -1).reverse().reduce(
        (memo, fn) => fn(memo),
        fns[fns.length - 1](...args),
      );
