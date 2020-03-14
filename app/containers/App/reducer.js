/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './constants';

// The initial state of the App
export const initialState = {
  isLoggedIn: false,
  evt: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_LOGGED_IN:
        draft.isLoggedIn = true;
        draft.evt = action.evt;
        break;
      case USER_LOGGED_OUT:
        draft.isLoggedIn = false;
        draft.evt = action.evt;
        break;
    }
  });

export default appReducer;
