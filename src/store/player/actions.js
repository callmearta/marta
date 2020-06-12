import * as actionTypes from './action-types';

export const togglePlayMusic = () => ({ type: actionTypes.TOGGLE_PLAY });

export const setMusic = (payload) => ({ type: actionTypes.SET_MUSIC, payload });

export const setPlaylist = (payload) => ({ type: actionTypes.SET_PLAYLIST, payload });

export const setPos = (payload) => ({ type: actionTypes.SET_POS, payload });

export const setDuration = (payload) => ({ type: actionTypes.SET_DURATION, payload });

export const setInitialized = (payload) => ({ type: actionTypes.SET_INITIALIZED, payload });
