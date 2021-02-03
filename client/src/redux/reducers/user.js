import { SET_AUTH_DATA, SET_GENERAL_DATA } from '../actions/user';

export default function user(
  state = {
    auth: {},
    general: {},
  },
  action,
) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        auth: {
          ...action.payload,
        },
      };
    case SET_GENERAL_DATA:
      return {
        ...state,
        general: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
