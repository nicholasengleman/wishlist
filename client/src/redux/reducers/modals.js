import {
  DISPLAY_CATEGORY_MODAL,
  HIDE_CATEGORY_MODAL,
  DISPLAY_WISH_MODAL,
  HIDE_WISH_MODAL,
} from '../actions/modals';

export default function modals(
  state = { categoryModal: {}, wishModal: {} },
  action,
) {
  switch (action.type) {
    case DISPLAY_CATEGORY_MODAL:
      return {
        ...state,
        categoryModal: {
          status: true,
          mode: action.payload.mode,
          catIndex: action.payload.catIndex,
        },
      };
    case HIDE_CATEGORY_MODAL:
      return {
        ...state,
        categoryModal: {
          status: false,
          mode: '',
          catIndex: '',
        },
      };
    case DISPLAY_WISH_MODAL:
      return {
        ...state,
        wishModal: {
          status: true,
          mode: action.payload.mode,
          wishIndex: action.payload.wishIndex,
          catIndex: action.payload.catIndex,
        },
      };
    case HIDE_WISH_MODAL:
      return {
        ...state,
        wishModal: {
          status: false,
          mode: '',
          wishIndex: '',
          catIndex: '',
        },
      };
    default:
      return state;
  }
}
