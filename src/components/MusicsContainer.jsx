import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import Music from './Music';
import * as PlayerActions from '../store/player/actions';

function MusicSlider({
  musics, loading, title, setCurrentPlaylist,
}) {
  const handlePlaylist = () => {
    setCurrentPlaylist(musics
      .reduce((p1, p2) => (p1.find((t) => t.id === p2.id) ? p1 : [...p1, p2]), []));
  };

  return (
    <Loading
      loading={loading}
    >
      <h2 className="section-title">{title}</h2>
      <div className="musics-container">
        <div className="musics-container__inner">
          {musics.map((music) => (
            <Music
              key={music.id}
              setCurrentPlaylist={handlePlaylist}
              music={music}
            />
          ))}
        </div>
      </div>
    </Loading>
  );
}

const mapDispatchToProps = {
  setCurrentPlaylist: PlayerActions.setPlaylist,
};

export default connect(null, mapDispatchToProps)(MusicSlider);
