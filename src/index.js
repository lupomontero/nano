export {
  compose,
  combineReducers,
  createStore,
  Provider,
  withStore,
  connect,
  applyMiddleware,
} from './store';


//
// Render component into given DOM Node
//
export const render = (component, node) => {
  const child = component({});
  if (child) {
    Object.assign(node, { innerHTML: '' });
    node.appendChild(child);
  }
};


//
// Create DOM Element
//
export const createElement = (tagName, opts = {}) => {
  const { children, style, ...rest } = opts;
  const element = Object.assign(document.createElement(tagName), rest);

  if (children && typeof children.forEach === 'function') {
    children.filter(item => item).forEach(element.appendChild.bind(element));
  }

  if (style) {
    Object.assign(element.style, style);
  }

  return element;
};
