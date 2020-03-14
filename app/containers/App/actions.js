import { USER_LOGGED_IN, USER_LOGGED_OUT } from './constants';

export function loginUser(evt) {
  return {
    type: USER_LOGGED_IN,
    evt,
  };
}

export function logoutUser(evt) {
  return {
    type: USER_LOGGED_OUT,
    evt,
  };
}
