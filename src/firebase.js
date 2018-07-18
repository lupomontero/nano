import { combineReducers } from './store';


const authReducer = (state = {
  loading: false,
  loaded: false,
  user: undefined,
  error: undefined,
}, action) => {
  switch (action.type) {
    case 'FIREBASE_AUTH_STATE_LOADING':
      return {
        ...state,
        loading: true,
        loaded: false,
        user: null,
        error: null,
      };
    case 'FIREBASE_AUTH_STATE_ERROR':
      return {
        ...state,
        loading: false,
        loaded: true,
        user: null,
        error: action.payload,
      };
    case 'FIREBASE_AUTH_STATE_CHANGED':
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.payload,
        error: null,
      };
    default:
      return state;
  }
};


export const firebaseReducer = combineReducers({
  auth: authReducer,
});


// export const firebaseMiddleWare = firebase => store => next => action => ...
export const firebaseMiddleWare = firebase => () => next => (action) => {
  const { type, payload } = action;

  switch (type) {
    case 'FIREBASE_SIGNUP':
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
      break;
    case 'FIREBASE_SIGNIN':
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
      break;
    case 'FIREBASE_SIGNOUT':
      firebase.auth().signOut();
      break;
    default:
      break;
  }

  return next(action);
};


export const nanoFirebase = firebase => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(reducer, initialState, enhancer);

  setTimeout(() => {
    store.dispatch({ type: 'FIREBASE_AUTH_STATE_LOADING' });

    firebase.auth().onAuthStateChanged(user => store.dispatch({
      type: 'FIREBASE_AUTH_STATE_CHANGED',
      payload: user,
    }), err => store.dispatch({
      type: 'FIREBASE_AUTH_STATE_ERROR',
      payload: err,
    }));
  }, 0);

  return store;
};


export const withFirebase = firebase => Component => props => Component({
  ...props,
  firebase,
});
