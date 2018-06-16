export const combineReducers =
  reducers =>
    (action, state) =>
      Object.keys(reducers).reduce((memo, key) => ({
        ...memo,
        [key]: reducers[key](action, memo[key]),
      }), state);


export const createStore = (reducer, initialState = {}, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = reducer({ type: 'INIT' }, initialState);
  const listeners = [];

  const store = {
    getState: () => ({ ...state }),
    dispatch: (action) => {
      state = reducer(action, { ...state });
      listeners.forEach(listener => listener());
      return action;
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {}; // unsubscribe?
    },
  };

  return store;
};


export const Provider =
  store =>
    component =>
      props => component({ ...props, store });


export const connect =
  (mapState, mapDispatch) =>
    component =>
      props => component({ ...props, ...mapState(props.store.getState()) });


export const applyMiddleware =
  (...middlewares) =>
    (createStore) =>
      (reducers, initialState, enhancer) => {
        const store = createStore(reducers, initialState, enhancer);
        return {
          ...store,
          dispatch: middlewares.slice().reverse().reduce(
            (dispatch, middleware) => middleware(store)(dispatch),
            store.dispatch,
          ),
        };
      };


export const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const dispatchedAction = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return dispatchedAction;
};
