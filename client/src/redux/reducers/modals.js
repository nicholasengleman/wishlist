import {
  TOGGLE_CATEGORY_MODAL,
  TOGGLE_WISH_MODAL,
  TOGGLE_EDIT_PROFILE_MODAL,
  TOGGLE_SIGN_UP_MODAL,
  TOGGLE_SIGN_IN_MODAL,
  TOGGLE_EDIT_AVATAR_MODAL,
} from '../actions/modals';

export default function modals(
  state = {
    categoryModal: {},
    wishModal: {},
    editProfileModal: {},
    signUpModal: {},
    signInModal: {},
    editAvatarModal: {},
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_CATEGORY_MODAL:
      if (!state.categoryModal.status) {
        return {
          ...state,
          categoryModal: {
            status: true,
            mode: action.payload.mode,
            catIndex: action.payload.catIndex,
          },
        };
      } else {
        return {
          ...state,
          categoryModal: {
            status: false,
            mode: '',
            catIndex: '',
          },
        };
      }
    case TOGGLE_WISH_MODAL:
      if (!state.wishModal.status) {
        return {
          ...state,
          wishModal: {
            status: true,
            mode: action.payload.mode,
            wishIndex: action.payload.wishIndex,
            catIndex: action.payload.catIndex,
          },
        };
      } else {
        return {
          ...state,
          wishModal: {
            status: false,
            mode: '',
            wishIndex: '',
            catIndex: '',
          },
        };
      }

    case TOGGLE_EDIT_PROFILE_MODAL:
      return {
        ...state,
        editProfileModal: {
          status: !state.editProfileModal.status,
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
