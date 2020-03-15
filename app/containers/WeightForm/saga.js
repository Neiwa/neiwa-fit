import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { makeBearerToken } from 'containers/LoginForm/selectors';
import { makeSelectStart, makeSelectEnd } from './selectors';
import { weightDataLoaded, weightDataLoadingError } from './actions';

import { LOAD_WEIGHT_DATA } from './constants';

function getWeightData({ start, end, type, bearerToken }) {
  return axios.request({
    method: 'POST',
    url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
    data: {
      aggregateBy: [
        {
          dataSourceId: type,
        },
      ],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: start,
      endTimeMillis: end,
    },
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
}

export function* fetchWeightData() {
  const start = yield select(makeSelectStart());
  const end = yield select(makeSelectEnd());
  const bearerToken = yield select(makeBearerToken());
  try {
    const data = yield call(getWeightData, {
      start,
      end,
      type: 'derived:com.google.weight:com.google.android.gms:merge_weight',
      bearerToken,
    });
    yield put(weightDataLoaded(data));
  } catch (err) {
    yield put(weightDataLoadingError(err));
  }
}

// Individual exports for testing
export default function* weightData() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(LOAD_WEIGHT_DATA, fetchWeightData);
}
