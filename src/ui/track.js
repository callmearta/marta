import React from 'react';
import { connect } from 'react-redux';

import * as PlayerActions from '../state/actions/player';

function Track(props) {
    const { music, currentMusic, setMusic, togglePlay, isPlaying, setInitialized } = props;

    const handleClick = () => {
        props.setCurrentPlaylist();
        if (currentMusic.id === music.id) {
            return togglePlay();
        }
        setInitialized();
        return setMusic(music);
    }

    return (
        <div className={"track" + (currentMusic.id === music.id ? ' active' : '')} onClick={handleClick}>
            <div className="track__image">
                <img src={music.thumbnail && music.thumbnail.length ? music.thumbnail : music.cover} alt={music.name} />
            </div>
            <div className="track__body">
                <div className="d-flex align-items-center justify-content-start">
                    <h2>{music.name}</h2>
                    <h3>{music.artists.map((artist, i) => artist.name + (i !== music.artists.length - 1 ? ', ' : ''))}</h3>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <b className="play-count">{music.play_count || '-'} <small>plays</small></b>
                    {currentMusic.id === music.id ?
                        (isPlaying ?
                            <i className="fal fa-pause"></i>
                            : <i className="fal fa-play"></i>)
                        : <i className="fal fa-play"></i>}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setMusic: music => dispatch(PlayerActions.setMusic(music)),
        togglePlay: () => dispatch(PlayerActions.togglePlayMusic()),
        setInitialized: () => dispatch(PlayerActions.setInitialized(true))
    };
};

const mapStateToProps = state => {
    return {
        currentMusic: state.playerReducer.music,
        isPlaying: state.playerReducer.isPlaying
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);