export const firebaseReducer = (action, state = {}) => {
  switch (action.type) {
    case 'FIREBASE_AUTH_STATE_CHANGED':
      return { ...state, auth: action.payload };
  }

  return state;
};


export const firebaseMiddleWare = firebase => store => next => action => {
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
  }

  return next(action);
};


export const nanoFirebase = (firebase) => (createStore) => {
  return (reducers, initialState, enhancer) => {
    const store = createStore(reducers, initialState, enhancer);

    firebase.auth().onAuthStateChanged(user => store.dispatch({
      type: 'FIREBASE_AUTH_STATE_CHANGED',
      payload: user,
    }));

    return { ...store, firebase };
  };
};
