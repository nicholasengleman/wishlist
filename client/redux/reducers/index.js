import { combineReducers } from 'redux';

import modals from './modals';
import menus from './menus';

export default combineReducers({
  modals,
  menus,
});
