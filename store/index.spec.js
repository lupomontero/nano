const { combineReducers, createStore, Provider, connect, applyMiddleware } = require('./index');


describe('combineReducers', () => {

  it('should combine reducers', () => {
    const combined = combineReducers({
      potatos: (action, state = { data: [] }) => {
        if (action.type === 'ADD_POTATO') {
          return { ...state, data: [...state.data, action.payload] };
        }
        return state;
      },
      tomatos: (action, state = { count: 0 }) => {
        if (action.type === 'ADD_TOMATO') {
          return { ...state, count: state.count++ }
        }
        return state;
      },
    });

    const state1 = combined({ type: 'ADD_POTATO', payload: true }, {});
    expect(state1).toMatchSnapshot();

    const state2 = combined({ type: 'ADD_POTATO', payload: true }, state1);
    expect(state2).toMatchSnapshot();

    const state3 = combined({ type: 'ADD_TOMATO', payload: true }, state1);
    expect(state3).toMatchSnapshot();
  });

});


describe('createStore', () => {

  it('should create store with reducer', () => {
    const reducer = (action, state) => state;
    const store = createStore(reducer);
    expect(store).toMatchSnapshot();
  });

  it('should create store with enhancer', () => {
    const reducer = (action, state) => state;
    const enhancer = create => (r, i, e) => ({ ...create(r, i, e), foo: true });
    const store = createStore(reducer, undefined, enhancer);
    expect(store).toMatchSnapshot();
  });

});


describe('Provider', () => {

  it('should...', () => {
    // ...
  });

});


describe('connect', () => {

  it('should...', () => {
    // ...
  });

});


describe('applyMiddleware', () => {

  it('should...', () => {
    // ...
  });

});
