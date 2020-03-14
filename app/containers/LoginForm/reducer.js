/*
 *
 * LoginForm reducer
 *
 */
import produce from 'immer';
import { SET_LOGIN_IN_PROGRESS } from './constants';

// The initial state of the App
export const initialState = {
  loginInProgress: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGIN_IN_PROGRESS:
        draft.loginInProgress = action.value;
        break;
    }
  });

export default loginFormReducer;
