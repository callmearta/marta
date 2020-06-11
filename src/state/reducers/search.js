import * as Consts from '../constants/search';

const initialState = {
    result: {},
    loading: false
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Consts.FETCH_RESULT:
            return { ...state, loading: true };
        case Consts.FETCH_RESULT_SUCCESS:
            return { ...state, result: action.payload, loading: false };
        case Consts.FETCH_RESULT_FAILED:
            return { ...state, result: null, loading: false };
        default:
            return state;
    }
};

export default searchReducer;