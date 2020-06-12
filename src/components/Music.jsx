import React from 'react';
import { connect } from 'react-redux';
import * as PlayerActions from '../store/player/actions';

function Music({
  music, currentMusic, setMusic, togglePlay, isPlaying, setInitialized, setCurrentPlaylist,
}) {
  const handleClick = () => {
    setCurrentPlaylist();
    if (currentMusic.id === music.id) {
      return togglePlay();
    }
    setInitialized();
    return setMusic(music);
  };

  return (
    <div className="music-wrapper" onClick={handleClick}>
      <div className="music-wrapper__image">
        {currentMusic.id === music.id
          ? (
            <div className="music-wrapper__image__overlay">
              <i className={`fal ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
            </div>
          )
          : ''}
        <img src={music.cover} alt={music.title} />
      </div>
      <div className="music-wrapper__body">
        <strong>{music.name}</strong>
        <small>
          { music.artists.length > 1
            ? music.artists
              .map((artist, i) => artist.name + (i !== music.artists.length - 1 ? ', ' : ''))
            : music.artists[0].name}
        </small>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setMusic: (music) => dispatch(PlayerActions.setMusic(music)),
  togglePlay: () => dispatch(PlayerActions.togglePlayMusic()),
  setInitialized: () => dispatch(PlayerActions.setInitialized(true)),
});

const mapStateToProps = (state) => ({
  currentMusic: state.playerReducer.music,
  isPlaying: state.playerReducer.isPlaying,
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);
