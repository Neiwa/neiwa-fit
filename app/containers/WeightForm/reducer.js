/*
 *
 * WeightForm reducer
 *
 */
import produce from 'immer';
import { subMonths, startOfDay } from 'date-fns';
import { addSlice } from 'utils/slice';
import {
  LOAD_WEIGHT_DATA,
  LOAD_WEIGHT_DATA_ERROR,
  LOAD_WEIGHT_DATA_SUCCESS,
  CHANGE_START,
  CHANGE_END,
} from './constants';

export const initialState = {
  start: startOfDay(subMonths(new Date(), 1)).valueOf(),
  end: new Date().valueOf(),
  loading: false,
  error: false,
  dataCache: {
    slices: [],
    data: new Map(),
  },
};

export function updateDataCache(dataCache, newData) {
  newData.bucket
    .filter(e => undefined !== e.dataset[0].point[0])
    .forEach(e => {
      dataCache.data.set(
        e.dataset[0].point[0].startTimeNanos / 1000000,
        e.dataset[0].point[0].value[0].fpVal,
      );
    });

  const start = Number(newData.bucket[0].startTimeMillis);
  const end = Number(newData.bucket[newData.bucket.length - 1].endTimeMillis);
  // eslint-disable-next-line no-param-reassign
  dataCache.slices = addSlice({ start, end }, dataCache.slices);

  return dataCache;
}

/* eslint-disable default-case, no-param-reassign */
const weightFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_WEIGHT_DATA:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_WEIGHT_DATA_SUCCESS:
        draft.loading = false;
        if (action.dataFetched) {
          draft.dataCache = updateDataCache(draft.dataCache, action.data);
        }
        break;
      case LOAD_WEIGHT_DATA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case CHANGE_START:
        draft.start = action.start;
        break;
      case CHANGE_END:
        draft.end = action.end;
        break;
    }
  });

export default weightFormReducer;
