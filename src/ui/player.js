import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import * as PlayerActions from '../state/actions/player';

function Player(props) {
    const { currentMusic, isPlaying, currentPos, togglePlay, setPos, setDuration, duration } = props;
    const audio = useRef(new Audio());
    const currentPosInterval = useRef();

    const setCurrentPosHandler = () => {
        currentPosInterval.current = setInterval(function () {
            setPos(audio.current.currentTime);
        }, 500);
    }

    const destroyCurrentPosHandler = () => {
        clearInterval(currentPosInterval.current);
        currentPosInterval.current = null;
    }

    useEffect(() => {
        if (currentMusic.link320 || currentMusic.link128 || currentMusic.link64) {
            audio.current.src = currentMusic.link320 || currentMusic.link128 || currentMusic.link64;
            audio.current.onloadedmetadata = function () {
                setDuration(audio.current.duration);
            };
            audio.current.play();
            if (!isPlaying) {
                togglePlay();
            }
        }
    }, [currentMusic]);

    useEffect(() => {
        if (isPlaying) {
            setCurrentPosHandler();
            audio.current.play();
        } else {
            destroyCurrentPosHandler();
            audio.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="player-wrapper">
            <div className="container">
                <div className="player-inner">
                    <div className="player-inner__left">
                        <div className="player-inner__left__cover">
                            {currentMusic.id ? <img src={currentMusic.cover || ''} alt={currentMusic.name || '-'} /> : ''}
                        </div>
                    </div>
                    <div className="player-inner__center">
                        <div className="player-inner__center__details">
                            {currentMusic.id ?
                                <React.Fragment>
                                    <div>
                                        <strong>{currentMusic.name || '-'}</strong>
                                        <small>
                                            {currentMusic.artists.length ?
                                                (currentMusic.artists.length > 1 ? currentMusic.artists.map(
                                                    (artist, i) => artist.name + (i !== currentMusic.artists.length - 1 ? ', ' : '')
                                                ) : currentMusic.artists[0].name)
                                                : ''}
                                        </small>
                                    </div>
                                    <div>
                                        <b>{parseInt(currentPos / 60)}:{currentPos % 60 < 10 ? '0' + parseInt(currentPos % 60) : parseInt(currentPos % 60)}</b>
                                        <small>/{parseInt(duration / 60)}:{duration % 60 < 10 ? '0' + parseInt(duration % 60) : parseInt(duration % 60)}</small>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <strong>Start Playing Something...</strong>
                                    <div>
                                        <b>-</b>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                        <div className="player-inner__center__seekbar">
                            <div className="player-inner__center__seekbar__filled" style={{ width: currentPos > 0 ? ((currentPos * 100) / duration) + '%' : 0 }}>
                                <div className="player-inner__center__seekbar__filled__thumb"></div>
                            </div>
                        </div>
                    </div>
                    <div className="player-inner__right">
                        <div className="player-inner__right__actions">
                            <i className="fal fa-backward" />
                            <i className={"fal " + (isPlaying ? 'fa-pause' : 'fa-play')} onClick={togglePlay} />
                            <i className="fal fa-forward" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentMusic: state.playerReducer.music,
        isPlaying: state.playerReducer.isPlaying,
        currentPos: state.playerReducer.currentPos,
        duration: state.playerReducer.duration
    };
};

const mapDispatchToProps = dispatch => {
    return {
        togglePlay: () => dispatch(PlayerActions.togglePlayMusic()),
        setPos: pos => dispatch(PlayerActions.setPos(pos)),
        setDuration: duration => dispatch(PlayerActions.setDuration(duration))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);