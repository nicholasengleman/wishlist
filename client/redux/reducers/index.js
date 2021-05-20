import { combineReducers } from 'redux';

import modals from './modals';
import user from './user';
import menus from './menus';

export default combineReducers({
  modals,
  user,
  menus,
});
