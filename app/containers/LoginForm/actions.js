/*
 *
 * LoginForm actions
 *
 */
import {
  SET_LOGIN_IN_PROGRESS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './constants';

export function setLoginInProgress(value) {
  return {
    type: SET_LOGIN_IN_PROGRESS,
    value,
  };
}

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
