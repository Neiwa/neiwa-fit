/*
 *
 * LoginForm actions
 *
 */
import { SET_LOGIN_IN_PROGRESS } from './constants';

export function setLoginInProgress(value) {
  return {
    type: SET_LOGIN_IN_PROGRESS,
    value,
  };
}
