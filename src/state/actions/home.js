import * as Consts from '../constants/home';

import Api from '../../helpers/api';

export const fetchMusicsFind = () => {
    return async dispatch => {
        dispatch({ type: Consts.FETCH_MUSICS_FIND });
        const result = await Api.getMusics();
        if (result.success) {
            const musics = result.data;
            return dispatch({ payload: musics, type: Consts.FETCH_MUSICS_FIND_SUCCESS });
        } else {
            return dispatch({ type: Consts.FETCH_MUSICS_FIND_FAILED });
        }
    };
};

export const fetchVitrines = () => {
    return async dispatch => {
        dispatch({ type: Consts.FETCH_VITRINES });
        const result = await Api.getPlaylistsVitrines();
        if (result.success) {
            const vitrines = result.data;
            return dispatch({ payload: vitrines, type: Consts.FETCH_VITRINES_SUCCESS });
        } else {
            return dispatch({ type: Consts.FETCH_VITRINES_FAILED });
        }
    }
};