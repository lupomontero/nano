const {
  compose,
  combineReducers,
  createStore,
  Provider,
  connect,
  applyMiddleware,
} = require('../src/store');


describe('compose', () => {
  it('should compose functions', () => {
    const fn1 = jest.fn().mockImplementation(arg => [...arg, true]);
    const fn2 = jest.fn().mockImplementation(arg => [...arg, true]);
    const fn3 = jest.fn().mockImplementation((...args) => [...args, true]);

    expect(compose(fn1, fn2, fn3)(1, 2, 3)).toEqual([1, 2, 3, true, true, true]);
  });
});


describe('combineReducers', () => {
  it('should combine reducers', () => {
    const combined = combineReducers({
      potatos: (state = { data: [] }, action) => {
        if (action.type === 'ADD_POTATO') {
          return { ...state, data: [...state.data, action.payload] };
        }
        return state;
      },
      tomatos: (state = { count: 0 }, action) => {
        if (action.type === 'ADD_TOMATO') {
          return { ...state, count: state.count + 1 };
        }
        return state;
      },
    });

    const state1 = combined({}, { type: 'ADD_POTATO', payload: true });
    expect(state1).toMatchSnapshot();

    const state2 = combined(state1, { type: 'ADD_POTATO', payload: true });
    expect(state2).toMatchSnapshot();

    const state3 = combined(state1, { type: 'ADD_TOMATO', payload: true });
    expect(state3).toMatchSnapshot();
  });
});


describe('createStore', () => {
  it('should create store with reducer', () => {
    const reducer = state => state;
    const store = createStore(reducer);
    expect(store).toMatchSnapshot();
  });

  it('should create store with enhancer', () => {
    const reducer = state => state;
    const enhancer = create => (r, i, e) => ({ ...create(r, i, e), foo: true });
    const store = createStore(reducer, undefined, enhancer);
    expect(store).toMatchSnapshot();
  });
});


describe('Provider', () => {
  it('should...', () => {
    expect(typeof Provider).toBe('function');
  });
});


describe('connect', () => {
  it('should...', () => {
    expect(typeof connect).toBe('function');
  });
});


describe('applyMiddleware', () => {
  it('should...', () => {
    expect(typeof applyMiddleware).toBe('function');
  });
});
