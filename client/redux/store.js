import { createStore, compose } from 'redux';
import reducer from './reducers/index';

/* eslint-disable no-underscore-dangle, no-undef */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducer,
  composeEnhancers,
);
/* eslint-enable */

export default store;
