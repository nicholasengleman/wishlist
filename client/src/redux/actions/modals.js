export const TOGGLE_CATEGORY_MODAL = 'TOGGLE_CATEGORY_MODAL';
export const TOGGLE_WISH_MODAL = 'TOGGLE_WISH_MODAL';
export const TOGGLE_EDIT_PROFILE_MODAL = 'TOGGLE_EDIT_PROFILE_MODAL';
export const TOGGLE_SIGN_UP_MODAL = 'TOGGLE_SIGN_UP_MODAL';

export function toggleCategoryModal(payload) {
  return {
    type: TOGGLE_CATEGORY_MODAL,
    payload,
  };
}

export function toggleWishModal(payload) {
  return {
    type: TOGGLE_WISH_MODAL,
    payload,
  };
}

export function toggleEditProfileModal() {
  return {
    type: TOGGLE_EDIT_PROFILE_MODAL,
  };
}

export function toggleSignUpModal() {
  return {
    type: TOGGLE_SIGN_UP_MODAL,
  };
}
