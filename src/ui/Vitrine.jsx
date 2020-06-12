import React from 'react';

import MusicsContainer from './MusicsContainer';
import PlaylistsContainer from './PlaylistsContainer';
import ArtistsContainer from './ArtistsContainer';

function Vitrine({
  name, type, data, hero,
}) {
  return (
    <div className={`vitrine-wrapper${hero ? ' hero-wrapper' : ''}`}>
      {type !== 'ad' ? <h2 className="section-title vitrine-title">{name}</h2> : ''}
      {
        {
          musics: <MusicsContainer musics={data} loading={false} />,
          artists: <ArtistsContainer artists={data} />,
          grid: <MusicsContainer musics={data} loading={false} />,
          playlists: <PlaylistsContainer playlists={data} loading={false} />,
          hero_sliders: <PlaylistsContainer playlists={data} loading={false} />,
          genres: <PlaylistsContainer playlists={data} loading={false} />,
          albums: <PlaylistsContainer playlists={data} loading={false} />,
        }[type]
      }
    </div>
  );
}

export default Vitrine;
