import * as Consts from '../constants/home';

const initialState = {
    musicsFind: {
        data: [],
        loading: false
    },
    vitrines: {
        data: [],
        loading: false
    }
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Consts.FETCH_MUSICS_FIND:
            return { ...state, musicsFind: { ...state.musicsFind, loading: true } };
        case Consts.FETCH_MUSICS_FIND_SUCCESS:
            return { ...state, musicsFind: { data: action.payload, loading: false } };
        case Consts.FETCH_MUSICS_FIND_FAILED:
            return { ...state, musicsFind: { ...state.musicsFind, loading: false } };
        case Consts.FETCH_VITRINES:
            return { ...state, vitrines: { ...state.vitrines, loading: true } };
        case Consts.FETCH_VITRINES_SUCCESS:
            return { ...state, vitrines: { data: action.payload, loading: false } };
        case Consts.FETCH_VITRINES_FAILED:
            return { ...state, vitrines: { ...state.vitrines, loading: false } };
        default:
            return state;
    }
};

export default homeReducer;