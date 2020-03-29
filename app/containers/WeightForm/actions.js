/*
 *
 * WeightForm actions
 *
 */

import {
  LOAD_WEIGHT_DATA,
  LOAD_WEIGHT_DATA_SUCCESS,
  LOAD_WEIGHT_DATA_ERROR,
  CHANGE_START,
  CHANGE_END,
} from './constants';

export function changeStart(start) {
  return {
    type: CHANGE_START,
    start,
  };
}

export function changeEnd(end) {
  return {
    type: CHANGE_END,
    end,
  };
}

export function loadWeightData() {
  return {
    type: LOAD_WEIGHT_DATA,
  };
}

export function weightDataLoaded(data, dataFetched = true) {
  return {
    type: LOAD_WEIGHT_DATA_SUCCESS,
    dataFetched,
    data,
  };
}

export function weightDataLoadingError(error) {
  return {
    type: LOAD_WEIGHT_DATA_ERROR,
    error,
  };
}
