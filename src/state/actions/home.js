import * as Consts from '../constants/home';
import * as PlayerActions from '../actions/player';

import Api from '../../helpers/api';

export const fetchMusicsFind = (region) => {
    return async (dispatch, getState) => {
        dispatch({ type: Consts.FETCH_MUSICS_FIND, region });
        const result = await Api.getMusics(region === 'global' ? 'us' : 'ir');
        if (result.success) {
            const musics = result.data;
            if (!getState().playerReducer.music.id) {
                dispatch(PlayerActions.setMusic(musics[0]));
                dispatch(PlayerActions.setPlaylist(musics));
                dispatch(PlayerActions.togglePlayMusic());
            }
            return dispatch({ payload: musics, type: Consts.FETCH_MUSICS_FIND_SUCCESS, region });
        } else {
            return dispatch({ type: Consts.FETCH_MUSICS_FIND_FAILED, region });
        }
    };
};

export const fetchVitrines = (region) => {
    return async dispatch => {
        dispatch({ type: Consts.FETCH_VITRINES, region });
        const result = await Api.getPlaylistsVitrines(region === 'global' ? 'us' : 'ir');
        if (result.success) {
            const vitrines = result.data;
            return dispatch({ payload: vitrines, type: Consts.FETCH_VITRINES_SUCCESS, region });
        } else {
            return dispatch({ type: Consts.FETCH_VITRINES_FAILED, region });
        }
    }
};