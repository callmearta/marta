import React, { useEffect, useRef } from 'react';
import ReactSlider from 'react-slider';
import { connect } from 'react-redux';

import * as PlayerActions from '../state/actions/player';

function Player(props) {
    const { currentMusic, initialized, isPlaying, currentPos, togglePlay, setPos, setDuration, duration, playlist, setCurrentMusic, setInitialized } = props;
    const audio = useRef(new Audio());
    const currentPosInterval = useRef();

    audio.current.onended = function () {
        handleNextSong();
    };

    const handleNextSong = () => {
        const currentSongIndex = playlist.findIndex(track => track.id === currentMusic.id);
        let nextTrack;
        if (currentSongIndex + 1 !== playlist.length) {
            nextTrack = playlist[currentSongIndex + 1];
            setCurrentMusic(nextTrack);
            // handlePlay();
        } else {
            nextTrack = playlist[0];
            setCurrentMusic(nextTrack);
            // handlePlay();
        }
    }

    const handleMetaDatas = () => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: currentMusic.name,
                artist: currentMusic.artists.length > 1 ? currentMusic.artists.join(', ') : currentMusic.artists[0].name,
                album: '',
                artwork: [
                    { src: currentMusic.thumbnail || currentMusic.cover, sizes: '96x96', type: 'image/png' },
                    { src: currentMusic.thumbnail || currentMusic.cover, sizes: '128x128', type: 'image/png' },
                    { src: currentMusic.thumbnail || currentMusic.cover, sizes: '192x192', type: 'image/png' },
                    { src: currentMusic.thumbnail || currentMusic.cover, sizes: '256x256', type: 'image/png' },
                    { src: currentMusic.cover || currentMusic.thumbnail, sizes: '384x384', type: 'image/png' },
                    { src: currentMusic.cover || currentMusic.thumbnail, sizes: '512x512', type: 'image/png' },
                ]
            });

            navigator.mediaSession.setActionHandler('play', togglePlay);
            navigator.mediaSession.setActionHandler('pause', togglePlay);
            navigator.mediaSession.setActionHandler('seekbackward', function () { });
            navigator.mediaSession.setActionHandler('seekforward', function () { });
            navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong);
            navigator.mediaSession.setActionHandler('nexttrack', handleNextSong);
        }
    }

    const handlePrevSong = () => {
        const currentSongIndex = playlist.findIndex(track => track.id === currentMusic.id);
        let prevTrack;
        if (currentSongIndex - 1 !== -1) {
            prevTrack = playlist[currentSongIndex - 1];
            setCurrentMusic(prevTrack);
            handlePlay();
        } else {
            prevTrack = playlist[playlist.length - 1];
            setCurrentMusic(prevTrack);
            handlePlay();
        }
    }

    const setCurrentPosHandler = () => {
        currentPosInterval.current = setInterval(function () {
            setPos(audio.current.currentTime);
        }, 500);
    }

    const destroyCurrentPosHandler = () => {
        clearInterval(currentPosInterval.current);
        currentPosInterval.current = null;
    }

    const handlePlay = () => {
        audio.current.src = currentMusic.link320 || currentMusic.link128 || currentMusic.link64;
        audio.current.onloadedmetadata = function () {
            setDuration(audio.current.duration);
        };
        handleMetaDatas();
        if (initialized) {
            audio.current.play().catch(() => audio.current.play());
            if (!isPlaying) {
                togglePlay();
            }
        }
    }

    const handleSeekbar = secs => {
        setPos(secs);
        audio.current.currentTime = secs;
    }

    useEffect(() => {
        if (currentMusic.link320 || currentMusic.link128 || currentMusic.link64) {
            handlePlay();
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
                        <ReactSlider
                            className="player-inner__center__seekbar"
                            thumbClassName="player-inner__center__seekbar__filled__thumb"
                            trackClassName="player-inner__center__seekbar__filled"
                            renderThumb={props => <div {...props}></div>}
                            onChange={sec => handleSeekbar(sec)}
                            min={0}
                            value={currentPos}
                            max={duration || 100}
                        />
                    </div>
                    <div className="player-inner__right">
                        <div className="player-inner__right__actions">
                            <i className="fal fa-backward" onClick={handlePrevSong} />
                            <i className={"fal " + (isPlaying ? 'fa-pause' : 'fa-play')} onClick={() => {
                                setInitialized();
                                togglePlay();
                            }} />
                            <i className="fal fa-forward" onClick={handleNextSong} />
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
        duration: state.playerReducer.duration,
        playlist: state.playerReducer.playlist,
        initialized: state.playerReducer.initialized
    };
};

const mapDispatchToProps = dispatch => {
    return {
        togglePlay: () => dispatch(PlayerActions.togglePlayMusic()),
        setPos: pos => dispatch(PlayerActions.setPos(pos)),
        setDuration: duration => dispatch(PlayerActions.setDuration(duration)),
        setCurrentMusic: music => dispatch(PlayerActions.setMusic(music)),
        setInitialized: () => dispatch(PlayerActions.setInitialized(true))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);