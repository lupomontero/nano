import { createElement } from '../index';


const NotFound = () => createElement('div', {
  id: 'NotFound',
  innerText: 'Not found :-(',
});


export const routerReducer = (action, state = {
  path: undefined,
  route: { path: undefined, component: NotFound },
  prev: undefined,
}) => {
  switch (action.type) {
    case 'ROUTER_PUSH':
      return {
        ...action.payload,
        prev: { path: state.path, route: state.route },
      };
  }

  return state;
};


const findRoute = (opts, path) =>
  opts.routes.find(item => item.path === path) || {
    path: undefined,
    component: NotFound,
  };


const push = (opts, props, path) => {
  window.history.pushState({}, 'Page Title', path);
  props.store.dispatch({
    type: 'ROUTER_PUSH',
    payload: {
      path,
      route: findRoute(opts, path),
    },
  });
};

export const Router = opts => component => (props) => {
  const router = {
    push: path => push(opts, props, path),
    back: () => push(
      opts,
      props,
      (props.store.getState().router.prev || {}).path || '/',
    ),
  };

  if (typeof props.store.getState().router.path === 'undefined') {
    setTimeout(() => router.push(window.location.pathname), 0);
  }

  return component({ ...props, router });
};
