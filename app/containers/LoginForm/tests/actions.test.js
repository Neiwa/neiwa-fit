import { setLoginInProgress } from '../actions';
import { SET_LOGIN_IN_PROGRESS } from '../constants';

describe('LoginForm actions', () => {
  describe('loginUser Action', () => {
    it('has a type of SET_LOGIN_IN_PROGRESS', () => {
      const expected = {
        type: SET_LOGIN_IN_PROGRESS,
        value: true,
      };
      expect(setLoginInProgress(true)).toEqual(expected);
    });
  });
});
