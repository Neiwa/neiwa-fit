/*
 *
 * LoginForm reducer
 *
 */
import produce from 'immer';
import {
  SET_LOGIN_IN_PROGRESS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './constants';

// The initial state of the App
export const initialState = {
  loginInProgress: false,
  isLoggedIn: false,
  evt: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGIN_IN_PROGRESS:
        draft.loginInProgress = action.value;
        break;
      case USER_LOGGED_IN:
        draft.loginInProgress = false;
        draft.isLoggedIn = true;
        draft.evt = action.evt;
        break;
      case USER_LOGGED_OUT:
        draft.isLoggedIn = false;
        draft.evt = action.evt;
        break;
    }
  });

export default loginReducer;
