import React, { useEffect, useRef } from 'react';
import ReactSlider from 'react-slider';
import { connect } from 'react-redux';
import { Howl, Howler } from 'howler';

import * as PlayerActions from '../state/actions/player';

function Player({
  currentMusic,
  initialized,
  isPlaying,
  currentPos,
  togglePlay,
  setPos,
  setDuration,
  duration,
  playlist,
  setCurrentMusic,
  setInitialized,
}) {
  const audio = useRef();
  const currentPosInterval = useRef();

  const handleNextSong = () => {
    const currentSongIndex = playlist.findIndex((track) => track.id === currentMusic.id);
    let nextTrack;
    if (currentSongIndex + 1 !== playlist.length) {
      nextTrack = playlist[currentSongIndex + 1];
      setCurrentMusic(nextTrack);
    } else {
      nextTrack = playlist[0];
      setCurrentMusic(nextTrack);
    }
  };

  const handlePrevSong = () => {
    const currentSongIndex = playlist.findIndex((track) => track.id === currentMusic.id);
    let prevTrack;
    if (currentSongIndex - 1 !== -1) {
      prevTrack = playlist[currentSongIndex - 1];
      setCurrentMusic(prevTrack);
    } else {
      prevTrack = playlist[playlist.length - 1];
      setCurrentMusic(prevTrack);
    }
  };

  const SKIP_TIME = 10;

  const seekForward = () => {
    audio.current.currentTime = Math.min(audio.current.currentTime + SKIP_TIME, audio.current.duration);
  }

  const seekBackward = () => {
    audio.current.currentTime = Math.max(audio.current.currentTime - SKIP_TIME, 0);
  }

  const handleMetaDatas = () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentMusic.name,
        // eslint-disable-next-line no-nested-ternary
        artist: currentMusic.artists && currentMusic.artists.length
          ? (currentMusic.artists.length > 1
            ? currentMusic.artists.map((artist, i) => artist.name + (i !== currentMusic.artists.length - 1 ? ', ' : ''))
            : currentMusic.artists[0].name)
          : '-',
        album: '',
        artwork: [
          { src: currentMusic.thumbnail || currentMusic.cover, sizes: '96x96', type: 'image/png' },
          { src: currentMusic.thumbnail || currentMusic.cover, sizes: '128x128', type: 'image/png' },
          { src: currentMusic.thumbnail || currentMusic.cover, sizes: '192x192', type: 'image/png' },
          { src: currentMusic.thumbnail || currentMusic.cover, sizes: '256x256', type: 'image/png' },
          { src: currentMusic.cover || currentMusic.thumbnail, sizes: '384x384', type: 'image/png' },
          { src: currentMusic.cover || currentMusic.thumbnail, sizes: '512x512', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('seekbackward', seekBackward);
      navigator.mediaSession.setActionHandler('seekforward', seekForward);
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong);
      navigator.mediaSession.setActionHandler('nexttrack', handleNextSong);
    }
  };

  const setCurrentPosHandler = () => {
    currentPosInterval.current = setInterval(() => {
      setPos(audio.current.seek());
    }, 500);
  };

  const destroyCurrentPosHandler = () => {
    clearInterval(currentPosInterval.current);
    currentPosInterval.current = null;
  };

  const handlePlay = () => {
    if (audio.current) {
      audio.current.unload();
    }

    audio.current = new Howl({
      src: [currentMusic.link320, currentMusic.link128, currentMusic.link64],
      html5: true,
      preload: 'metadata',
      onend: () => handleNextSong(),
      onload: () => setDuration(audio.current.duration()),
    });

    audio.current._sounds[0]._node.title = currentMusic.name;

    handleMetaDatas();

    audio.current.play();
    if (initialized) {
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  const handleSeekbar = (secs) => {
    setPos(secs);
    audio.current.seek(secs);
  };

  useEffect(() => {
    if (currentMusic.link320 || currentMusic.link128 || currentMusic.link64) {
      handlePlay();
    }
  }, [currentMusic]);

  useEffect(() => {
    if (audio.current) {
      if (isPlaying) {
        setCurrentPosHandler();
        audio.current.play();
      } else {
        destroyCurrentPosHandler();
        audio.current.pause();
      }
    }
  }, [isPlaying]);

  const fixedInt = (value) => Number(value).toFixed(0);

  const playerUI = function () {
    const cover = currentMusic.id ? <img src={currentMusic.cover} alt={currentMusic.name || '-'} /> : '';
    const name = <strong>{currentMusic.name || '-'}</strong>;
    const artists = (
      <small>
        {// eslint-disable-next-line no-nested-ternary
          currentMusic.artists && currentMusic.artists.length
            ? (currentMusic.artists.length > 1 ? currentMusic.artists.map(
              (artist, i) => artist.name + (i !== currentMusic.artists.length - 1 ? ', ' : ''),
            ) : currentMusic.artists[0].name)
            : ''
        }
      </small>
    );
    const details = (
      <div>
        {name}
        {artists}
      </div>
    );
    const defaultDetails = (
      <>
        <strong>Start Playing Something...</strong>
        <div>
          <b>-</b>
        </div>
      </>
    );
    const currentTime = (
      <b>
        {!Number.isNaN(currentPos / 60) ? fixedInt(currentPos / 60) : 0}
        :
        {!Number.isNaN(currentPos / 60) ? currentPos % 60 < 10 ? `0${fixedInt(currentPos % 60)}` : fixedInt(currentPos % 60) : 0}
      </b>
    );
    const trackDuration = (
      <small>
        /
        {!Number.isNaN(duration / 60) ? fixedInt(duration / 60) : ''}
        :
        {!Number.isNaN(duration / 60) ? duration % 60 < 10 ? `0${fixedInt(duration % 60)}` : fixedInt(duration % 60) : 0}
      </small>
    );
    const time = (
      <div>
        {currentTime}
        {trackDuration}
      </div>
    );
    const seekBar = (
      <ReactSlider
        className="player-inner__center__seekbar"
        thumbClassName="player-inner__center__seekbar__filled__thumb"
        trackClassName="player-inner__center__seekbar__filled"
        renderThumb={(props) => <div {...props} />}
        onChange={(sec) => handleSeekbar(sec)}
        min={0}
        value={currentPos}
        max={duration || 100}
      />
    );
    const prevTrackButton = <i className="fal fa-backward" onClick={handlePrevSong} />;
    const nextTrackButton = <i className="fal fa-forward" onClick={handleNextSong} />;
    const playPauseButton = (
      <i
        className={`fal ${isPlaying ? 'fa-pause' : 'fa-play'}`}
        onClick={() => {
          setInitialized(true);
          togglePlay();
        }}
      />
    );
    const actions = (
      <div className="player-inner__right__actions">
        {prevTrackButton}
        {playPauseButton}
        {nextTrackButton}
      </div>
    );

    const left = (
      <div className="player-inner__left">
        <div className="player-inner__left__cover">
          {cover}
        </div>
      </div>
    );

    const center = (
      <div className="player-inner__center">
        <div className="player-inner__center__details">
          {currentMusic.id
            ? (
              <>
                {details}
                {time}
              </>
            )
            : defaultDetails}
        </div>
        {seekBar}
      </div>
    );

    const right = (
      <div className="player-inner__right">
        {actions}
      </div>
    );

    return { left, center, right };
  };

  return (
    <div className="player-wrapper">
      <div className="container">
        <div className="player-inner">
          {playerUI().left}
          {playerUI().center}
          {playerUI().right}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  playerReducer: {
    music,
    isPlaying,
    currentPos,
    duration,
    playlist,
    initialized,
  },
}) => ({
  currentMusic: music,
  isPlaying,
  currentPos,
  duration,
  playlist,
  initialized,
});

const mapDispatchToProps = {
  togglePlay: PlayerActions.togglePlayMusic,
  setPos: PlayerActions.setPos,
  setDuration: PlayerActions.setDuration,
  setCurrentMusic: PlayerActions.setMusic,
  setInitialized: PlayerActions.setInitialized,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
