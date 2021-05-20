import { SET_AUTH_DATA } from '../actions/user';

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
