import {
  compose,
  combineReducers,
  createStore,
  Provider,
  connect,
  applyMiddleware,
} from '../store';

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

const createCounterStore = () => createStore((state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}, 0);

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

  describe('store.getState', () => {
    it('should get the current state', () => {
      const store = createCounterStore();
      expect(store.getState()).toBe(0);
      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
      expect(store.getState()).toBe(1);
      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
      expect(store.getState()).toBe(2);
      expect(store.dispatch({ type: 'DECREMENT' })).toEqual({ type: 'DECREMENT' });
      expect(store.getState()).toBe(1);
      expect(store.dispatch({ type: 'RESET' })).toEqual({ type: 'RESET' });
      expect(store.getState()).toBe(0);
    });
  });

  describe('store.dispatch', () => {
    it('should invoke reducers with given action and return the dispatched action', () => {
      const store = createCounterStore();
      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
    });
  });

  describe('store.subscribe', () => {
    it('should register subscribers and return unsubscribe function', () => {
      const store = createCounterStore();
      const subscriber = jest.fn();
      const unsubscribe = store.subscribe(subscriber);
      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
      expect(subscriber.mock.calls.length).toBe(1);
      expect(subscriber.mock.calls[0].length).toBe(0);

      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
      expect(subscriber.mock.calls.length).toBe(2);

      unsubscribe();
      expect(store.dispatch({ type: 'INCREMENT' })).toEqual({ type: 'INCREMENT' });
      expect(subscriber.mock.calls.length).toBe(2);
    });
  });
});

describe('Provider', () => {
  it('should be a function', () => {
    expect(typeof Provider).toBe('function');
  });

  it('should return a function that returns HOC', () => {
    const store = createCounterStore();
    const ComponentWithStore = Provider(store)(props => props);
    const result = ComponentWithStore({ ok: true });
    expect(result.ok).toBe(true);
    expect(result.store).toBe(store);
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
