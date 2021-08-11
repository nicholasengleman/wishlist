import { combineReducers } from 'redux';

import modals from './modals';
import menus from './menus';
import sections from './sections';

export default combineReducers({
  modals,
  menus,
  sections,
});
