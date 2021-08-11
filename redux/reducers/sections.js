import { SET_SELECTED_SECTION } from '../actions/sections';

export default function sections(
  state = {
    selectedSection: '',
  },
  action,
) {
  switch (action.type) {
    case SET_SELECTED_SECTION:
      return {
        ...state,
        selectedSection: action?.payload,
      };
    default:
      return state;
  }
}
