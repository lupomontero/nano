import { Router, routerReducer } from '../router';

describe('Router (aka withRouter)', () => {
  it('should...', () => {
    expect(typeof Router).toBe('function');
  });
});

describe('routerReducer', () => {
  it('should return initial state en no previous state', () => {
    expect(routerReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle ROUTER_PUSH action', () => {
    const state1 = routerReducer(undefined, {
      type: 'ROUTER_PUSH',
      payload: { path: '/', route: { path: '/', component: () => {} } },
    });
    console.log(state1);
    const state2 = routerReducer(state1, {
      type: 'ROUTER_PUSH',
      payload: { path: '/some-path', route: { path: '/', component: () => {} } },
    });
    console.log(state2);
    // expect(routerReducer(undefined, {})).toMatchSnapshot();
  });
});
