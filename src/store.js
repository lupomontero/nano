export const compose =
  (...fns) =>
    (...args) =>
      fns.slice(0, -1).reverse().reduce(
        (memo, fn) => fn(memo),
        fns[fns.length - 1](...args),
      );


export const combineReducers =
  reducers =>
    (state, action) =>
      Object.keys(reducers).reduce((memo, key) => ({
        ...memo,
        [key]: reducers[key](memo[key], action),
      }), state || {});


export const createStore = (reducer, initialState, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = reducer(initialState, { type: 'INIT' });
  const listeners = [];

  const store = {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
      return action;
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => { // unsubscribe
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };

  return store;
};


export const Provider =
  store =>
    Component =>
      props => Component({ ...props, store });

// alias
export const withStore = Provider;


export const connect =
  (mapState, mapDispatch) =>
    Component =>
      props => Component({ ...props, ...mapState(props.store.getState()) });


export const applyMiddleware =
  (...middlewares) =>
    createStore =>
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


// export const logger = store => next => (action) => {
//   console.group(action.type);
//   console.info('dispatching', action);
//   const dispatchedAction = next(action);
//   console.log('next state', store.getState());
//   console.groupEnd();
//   return dispatchedAction;
// };
