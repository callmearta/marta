import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as PlayerActions from '../state/actions/player';

function Track({
  music,
  currentMusic,
  setMusic,
  togglePlay,
  isPlaying,
  setInitialized,
  setCurrentPlaylist,
}) {
  const coverSrc = music.thumbnail && music.thumbnail.length ? music.thumbnail : music.cover;
  const isTrackPlaying = currentMusic.id === music.id;
  const artistName = music.artists
    .map((artist, i) => artist.name + (i !== music.artists.length - 1 ? ', ' : ''));

  const className = classNames(
    'track',
    {
      'track--playing': isTrackPlaying,
    },
  );

  const handleClick = () => {
    setCurrentPlaylist();
    if (isTrackPlaying) {
      togglePlay();
      return;
    }
    setInitialized(true);
    setMusic(music);
  };

  function renderPlayButton() {
    if (!isTrackPlaying || !isPlaying) {
      return <i className="track__play-icon fal fa-play" />;
    }

    return <i className="track__play-icon fal fa-pause" />;
  }

  return (
    <div className={className} onClick={handleClick}>
      <img className="track__cover" src={coverSrc} alt={music.name} />
      <div className="track__content">
        <div className="track__details">
          <h2 className="track__name">
            {music.name}
          </h2>
          <h3 className="track__artist">
            {artistName}
          </h3>
        </div>
        <div className="track__actions">
          {music.play_count && (
            <b className="track__play-count">
              {music.play_count}
              <small>plays</small>
            </b>
          )}
          {renderPlayButton()}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setMusic: PlayerActions.setMusic,
  togglePlay: PlayerActions.togglePlayMusic,
  setInitialized: PlayerActions.setInitialized,
};

const mapStateToProps = ({
  playerReducer: {
    music: currentMusic,
    isPlaying,
  },
}) => ({
  currentMusic,
  isPlaying,
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
