/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const masterReducer = (state = {}, action) => {
  let nextState = rootReducer(state, action);
  const nextRouting = routerReducer(state.routing, action);
  if (nextRouting !== nextState.routing) {
    nextState = {
      ...nextState,
      routing: nextRouting,
    };
  }
  return nextState;
};


let createStoreWithMiddleware;

const myMiddleware = [
  thunkMiddleware,
  promiseMiddleware,
  routerMiddleware(browserHistory),
];

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const devTools = require('remote-redux-devtools');
  createStoreWithMiddleware = compose(
    applyMiddleware(...myMiddleware),
    devTools()
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(...myMiddleware, loggerMiddleware)(createStore);
}


/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(masterReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
