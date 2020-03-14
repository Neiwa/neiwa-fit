import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeIsLoggedIn = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLoggedIn,
  );

export { makeSelectLocation, makeIsLoggedIn };
