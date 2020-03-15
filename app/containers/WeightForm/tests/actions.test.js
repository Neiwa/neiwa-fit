import { changeStart } from '../actions';
import { CHANGE_START } from '../constants';

describe('WeightForm actions', () => {
  describe('changeStart', () => {
    it('should return the correct type and the passed start', () => {
      const fixture = '1';
      const expected = {
        type: CHANGE_START,
        start: fixture,
      };
      expect(changeStart(fixture)).toEqual(expected);
    });
  });
});
