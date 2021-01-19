import { SET_AUTH_USER } from '../actions/authUser';

export default function modals(
  state = {
    authUser: {},
  },
  action,
) {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
