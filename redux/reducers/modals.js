import {
  TOGGLE_CATEGORY_MODAL,
  TOGGLE_WISH_MODAL,
  TOGGLE_SETTINGS_MODAL,
  TOGGLE_SIGN_UP_MODAL,
  TOGGLE_SIGN_IN_MODAL,
  TOGGLE_RESET_PASSWORD_MODAL,
  TOGGLE_EDIT_AVATAR_MODAL,
} from '../actions/modals';

export default function modals(
  state = {
    categoryModal: {},
    wishModal: {},
    settingsModal: {},
    signUpModal: {},
    signInModal: {},
    resetPasswordModal: {},
    editAvatarModal: {},
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_CATEGORY_MODAL:
      return {
        ...state,
        categoryModal: {
          status: !state.categoryModal.status,
          mode: action?.payload?.mode,
          catId: action?.payload?.catId,
        },
      };
    case TOGGLE_WISH_MODAL:
      return {
        ...state,
        wishModal: {
          status: !state.wishModal.status,
          mode: action?.payload?.mode,
          wishIndex: action?.payload?.wishIndex,
          catId: action?.payload?.catId,
        },
      };
    case TOGGLE_SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: {
          status: !state.settingsModal.status,
        },
      };
    case TOGGLE_SIGN_UP_MODAL:
      return {
        ...state,
        signUpModal: {
          status: !state.signUpModal.status,
        },
      };
    case TOGGLE_SIGN_IN_MODAL:
      return {
        ...state,
        signInModal: {
          status: !state.signInModal.status,
        },
      };
    case TOGGLE_RESET_PASSWORD_MODAL:
      return {
        ...state,
        resetPasswordModal: {
          status: !state.resetPasswordModal.status,
        },
      };
    case TOGGLE_EDIT_AVATAR_MODAL:
      return {
        ...state,
        editAvatarModal: {
          status: !state.editAvatarModal.status,
        },
      };
    default:
      return state;
  }
}
