// import produce from 'immer';
import weightFormReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('weightFormReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      start: '0',
      end: '0',
      loading: false,
      error: false,
      data: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(weightFormReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
