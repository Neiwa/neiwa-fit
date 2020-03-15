import { selectWeightFormDomain } from '../selectors';

describe('selectWeightFormDomain', () => {
  it('should select the weightForm state', () => {
    const weightFormState = {
      start: '0',
      end: '0',
      loading: false,
      error: false,
      data: false,
    };
    const mockedState = {
      weightForm: weightFormState,
    };
    expect(selectWeightFormDomain(mockedState)).toEqual(weightFormState);
  });
});
