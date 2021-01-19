import { combineReducers } from 'redux';

import modals from './modals';
import authUser from './authUser';

export default combineReducers({
  modals,
  authUser,
});
