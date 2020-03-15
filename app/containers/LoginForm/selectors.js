import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginForm state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

const makeIsLoginInProgress = () =>
  createSelector(
    selectLoginDomain,
    loginState => loginState.loginInProgress,
  );

const makeIsLoggedIn = () =>
  createSelector(
    selectLoginDomain,
    loginState => loginState.isLoggedIn,
  );

const makeBearerToken = () =>
  createSelector(
    selectLoginDomain,
    loginState => loginState.evt.accessToken,
  );

/**
 * Default selector used by LoginForm
 */

const makeSelectLoginForm = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

export default makeSelectLoginForm;
export {
  selectLoginDomain,
  makeIsLoginInProgress,
  makeIsLoggedIn,
  makeBearerToken,
};
