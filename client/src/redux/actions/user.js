export const SET_AUTH_DATA = 'SET_AUTH_DATA';

export function setAuthData(payload) {
  return {
    type: SET_AUTH_DATA,
    payload,
  };
}
