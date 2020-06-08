import React from 'react';
import { connect } from 'react-redux';

import * as PlayerActions from '../state/actions/player';

function Music(props) {
    const { music, currentMusic, setMusic, togglePlay, isPlaying } = props;

    const handleClick = () => {
        if (currentMusic.id === music.id) {
            return togglePlay();
        }
        return setMusic(music);
    }

    return (
        <div className="music-wrapper" onClick={handleClick}>
            <div className="music-wrapper__image">
                {currentMusic.id === music.id ?
                    <div className="music-wrapper__image__overlay">
                        <i className={"fal " + (isPlaying ? 'fa-pause' : 'fa-play')}></i>
                    </div>
                    : ''}
                <img src={music.cover} alt={music.title} />
            </div>
            <div className="music-wrapper__body">
                <strong>{music.name}</strong>
                <small>{music.artists.length > 1 ? music.artists.map((artist, i) => artist.name + (i !== music.artists.length - 1 ? ', ' : '')) : music.artists[0].name}</small>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setMusic: music => dispatch(PlayerActions.setMusic(music)),
        togglePlay: () => dispatch(PlayerActions.togglePlayMusic())
    };
};

const mapStateToProps = state => {
    return {
        currentMusic: state.playerReducer.music,
        isPlaying: state.playerReducer.isPlaying
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Music);