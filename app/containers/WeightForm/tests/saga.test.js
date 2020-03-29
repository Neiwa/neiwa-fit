/**
 * Test sagas
 */

import { put, takeEvery } from 'redux-saga/effects';

import { LOAD_WEIGHT_DATA } from '../constants';
import { weightDataLoaded /* , weightDataLoadingError */ } from '../actions';

import weightData, { fetchWeightData } from '../saga';

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import weightFormSaga from '../saga';

// const generator = weightFormSaga();

describe('weightFormSaga Saga', () => {
  let getWeightDataGenerator;

  beforeEach(() => {
    getWeightDataGenerator = fetchWeightData();

    const selectStartDescriptor = getWeightDataGenerator.next().value;
    expect(selectStartDescriptor).toMatchSnapshot();

    const selectEndDescriptor = getWeightDataGenerator.next(1454284800000)
      .value;
    expect(selectEndDescriptor).toMatchSnapshot();

    const selectBearerTokenDescriptor = getWeightDataGenerator.next(
      1454371200000,
    ).value;
    expect(selectBearerTokenDescriptor).toMatchSnapshot();

    const selectWeightDataSlicesDescriptor = getWeightDataGenerator.next('3')
      .value;
    expect(selectWeightDataSlicesDescriptor).toMatchSnapshot();

    const callDescriptor = getWeightDataGenerator.next([]).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the weightDataLoaded action if it requests the data successfully', () => {
    const data = {
      bucket: [
        {
          startTimeMillis: '1454284800000',
          endTimeMillis: '1454371200000',
          dataset: [
            {
              dataSourceId:
                'derived:com.google.weight.summary:com.google.android.gms:aggregated',
              point: [],
            },
          ],
        },
      ],
    };
    const response = {
      data,
    };
    const putDescriptor = getWeightDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(weightDataLoaded(data)));
  });
});

describe('weightDataSaga Saga', () => {
  const weightFormSaga = weightData();

  it('should start task to watch for LOAD_WEIGHT_DATA action', () => {
    const takeDescriptor = weightFormSaga.next().value;
    expect(takeDescriptor).toEqual(
      takeEvery(LOAD_WEIGHT_DATA, fetchWeightData),
    );
  });
});
