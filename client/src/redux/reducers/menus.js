import { TOGGLE_EDIT_COVER_MENU } from '../actions/menus';

export default function menus(
  state = {
    editCoverMenu: {},
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_EDIT_COVER_MENU:
      return {
        ...state,
        editCoverMenu: {
          status: !state.editCoverMenu.status,
        },
      };
    default:
      return state;
  }
}
