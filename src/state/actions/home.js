import * as actionTypes from '../action-types/home';
import * as PlayerActions from './player';

import Api from '../../helpers/api';

export const fetchMusicsFind = (region) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_MUSICS_FIND, region });
  const result = await Api.getMusics(region === 'global' ? 'us' : 'ir');
  if (result.success) {
    const musics = result.data;
    if (!getState().playerReducer.music.id) {
      dispatch(PlayerActions.setMusic(musics[0]));
      dispatch(PlayerActions.setPlaylist(musics));
      dispatch(PlayerActions.togglePlayMusic());
    }
    return dispatch({ payload: musics, type: actionTypes.FETCH_MUSICS_FIND_SUCCESS, region });
  }
  return dispatch({ type: actionTypes.FETCH_MUSICS_FIND_FAILED, region });
};

export const fetchVitrines = (region) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_VITRINES, region });
  const result = await Api.getPlaylistsVitrines(region === 'global' ? 'us' : 'ir');
  if (result.success) {
    const vitrines = result.data;
    return dispatch({ payload: vitrines, type: actionTypes.FETCH_VITRINES_SUCCESS, region });
  }
  return dispatch({ type: actionTypes.FETCH_VITRINES_FAILED, region });
};
