import { createElement } from '.';


const NotFound = () => createElement('div', {
  className: 'not-found',
  innerText: 'Not found :-(',
});


const Loading = () => createElement('div', {
  className: 'loading',
});


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


export const Router = opts => Component => (props) => {
  const state = props.store.getState().router || {};
  const router = {
    push: path => push(opts, props, path),
    back: () => push(opts, props, (state.prev || {}).path || '/'),
  };

  if (typeof state.path === 'undefined') {
    setTimeout(() => router.push(window.location.pathname), 0);
    return Loading();
  }

  window.addEventListener('popstate', () => {
    router.push(window.location.pathname);
  });

  return Component({ ...props, router });
};

// alias
export const withRouter = Router;


export const routerReducer = (state = {
  path: undefined,
  route: {
    path: undefined,
    component: undefined,
  },
  prev: undefined,
}, action) => {
  switch (action.type) {
    case 'ROUTER_PUSH':
      return {
        ...action.payload,
        prev: { path: state.path, route: state.route },
      };
    default:
      return state;
  }
};
