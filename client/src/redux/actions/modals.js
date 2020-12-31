export const DISPLAY_CATEGORY_MODAL = 'DISPLAY_CATEGORY_MODAL';
export const HIDE_CATEGORY_MODAL = 'HIDE_CATEGORY_MODAL';

export const DISPLAY_WISH_MODAL = 'DISPLAY_WISH_MODAL';
export const HIDE_WISH_MODAL = 'HIDE_WISH_MODAL';

export function displayCategoryModal(payload) {
  return {
    type: DISPLAY_CATEGORY_MODAL,
    payload,
  };
}

export function hideCategoryModal() {
  return {
    type: HIDE_CATEGORY_MODAL,
  };
}

export function displayWishModal(payload) {
  return {
    type: DISPLAY_WISH_MODAL,
    payload,
  };
}

export function hideWishModal() {
  return {
    type: HIDE_WISH_MODAL,
  };
}
