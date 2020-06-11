import * as Consts from '../constants/home';

const initialState = {
    global: {
        musicsFind: {
            data: [],
            loading: false
        },
        vitrines: {
            data: [],
            loading: false
        }
    },
    persian: {
        musicsFind: {
            data: [],
            loading: false
        },
        vitrines: {
            data: [],
            loading: false
        }
    }
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Consts.FETCH_MUSICS_FIND:
            return { ...state, [action.region]: { ...state[action.region], musicsFind: { ...state[action.region].musicsFind, loading: true } } };
        case Consts.FETCH_MUSICS_FIND_SUCCESS:
            return { ...state, [action.region]: { ...state[action.region], musicsFind: { data: action.payload, loading: false } } };
        case Consts.FETCH_MUSICS_FIND_FAILED:
            return { ...state, [action.region]: { ...state[action.region], musicsFind: { ...state[action.region].musicsFind, loading: false } } };
        case Consts.FETCH_VITRINES:
            return { ...state, [action.region]: { ...state[action.region], vitrines: { ...state[action.region].vitrines, loading: true } } };
        case Consts.FETCH_VITRINES_SUCCESS:
            return { ...state, [action.region]: { ...state[action.region], vitrines: { data: action.payload, loading: false } } };
        case Consts.FETCH_VITRINES_FAILED:
            return { ...state, [action.region]: { ...state[action.region], vitrines: { ...state[action.region].vitrines, loading: false } } };
        default:
            return state;
    }
};

export default homeReducer;