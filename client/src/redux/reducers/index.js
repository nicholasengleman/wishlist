import { combineReducers } from 'redux';

import modals from './modals';
import user from './user';

export default combineReducers({
  modals,
  user,
});
