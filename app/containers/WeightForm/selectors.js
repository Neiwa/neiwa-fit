import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the weightForm state domain
 */

const selectWeightFormDomain = state => state.weightForm || initialState;

/**
 * Other specific selectors
 */

const makeSelectStart = () =>
  createSelector(
    selectWeightFormDomain,
    substate => substate.start,
  );

const makeSelectEnd = () =>
  createSelector(
    selectWeightFormDomain,
    substate => substate.end,
  );

const makeSelectLoading = () =>
  createSelector(
    selectWeightFormDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by WeightForm
 */

const makeSelectWeightForm = () =>
  createSelector(
    selectWeightFormDomain,
    substate => substate,
  );

export default makeSelectWeightForm;
export {
  selectWeightFormDomain,
  makeSelectStart,
  makeSelectEnd,
  makeSelectLoading,
};
