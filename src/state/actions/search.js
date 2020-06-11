import * as Consts from '../constants/search';
import Api from '../../helpers/api';

export const fetchResult = query => {
    return async dispatch => {
        dispatch({ type: Consts.FETCH_RESULT });
        const result = await Api.getSearch(query).catch(err => dispatch({ type: Consts.FETCH_RESULT_FAILED }));
        if (result.success) {
            dispatch({ type: Consts.FETCH_RESULT_SUCCESS, payload: result.data })
        } else {
            dispatch({ type: Consts.FETCH_RESULT_FAILED });
        }
    }
};