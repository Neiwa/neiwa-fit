/*
 *
 * WeightForm reducer
 *
 */
import produce from 'immer';
import { subMonths, startOfDay } from 'date-fns';
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
  data: false,
};

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
        draft.data = action.data;
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
