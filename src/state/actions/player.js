import * as Consts from '../constants/player';

export const togglePlayMusic = () => {
    return { type: Consts.TOGGLE_PLAY };
}

export const setMusic = (payload) => {
    return { type: Consts.SET_MUSIC, payload };
};

export const setPlaylist = (payload) => {
    return { type: Consts.SET_PLAYLIST, payload };
}

export const setPos = (payload) => {
    return { type: Consts.SET_POS, payload };
}

export const setDuration = (payload) => {
    return { type: Consts.SET_DURATION, payload };
}