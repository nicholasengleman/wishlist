export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const SET_GENERAL_DATA = 'SET_GENERAL_DATA';

export function setAuthData(payload) {
  return {
    type: SET_AUTH_DATA,
    payload,
  };
}

export function setGeneralData(payload) {
  return {
    type: SET_GENERAL_DATA,
    payload,
  };
}
