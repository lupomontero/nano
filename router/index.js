import { createElement } from '../index';


const NotFound = () => createElement('div', {
  id: 'NotFound',
  innerText: 'Not found :-(',
});


export const routerReducer = (action, state = {
  path: undefined,
  route: { path: undefined, component: NotFound },
}) => {
  switch (action.type) {
    case 'ROUTER_PUSH':
      return { ...action.payload };
  }

  return state;
};


export const Router = opts => component => (props) => {
  const router = {
    push: path => {
      window.history.pushState({}, 'Page Title', path);
      props.store.dispatch({
        type: 'ROUTER_PUSH',
        payload: {
          path,
          route: opts.routes.find(item => item.path === path) || {
            path: undefined,
            component: NotFound,
          }
        },
      });
    },
  };

  if (typeof props.store.getState().router.path === 'undefined') {
    setTimeout(() => router.push(window.location.pathname), 0);
  }

  return component({ ...props, router });
};
