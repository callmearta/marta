import * as actionTypes from '../action-types/search';
import Api from '../../helpers/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchResult = (query) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_RESULT });
  const result = await Api.getSearch(query)
    .catch(() => dispatch({ type: actionTypes.FETCH_RESULT_FAILED }));

  if (result.success) {
    dispatch({ type: actionTypes.FETCH_RESULT_SUCCESS, payload: result.data });
    return;
  }

  dispatch({ type: actionTypes.FETCH_RESULT_FAILED });
};
