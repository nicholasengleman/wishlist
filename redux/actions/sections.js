export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION';

export function setSelectedSection(payload) {
  return {
    type: SET_SELECTED_SECTION,
    payload,
  };
}
