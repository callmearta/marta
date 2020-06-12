import React from 'react';
import MusicsContainer from './MusicsContainer';
import PlaylistsContainer from './PlaylistsContainer';
import ArtistsContainer from './ArtistsContainer';

function Vitrine({
  data: {
    type,
    data: innerData,
    name,
  }, hero,
}) {
  return (
    <div className={`vitrine-wrapper${hero ? ' hero-wrapper' : ''}`}>
      {type !== 'ad' ? <h2 className="section-title vitrine-title">{name}</h2> : ''}
      {
        {
          musics: <MusicsContainer musics={innerData} loading={false} />,
          artists: <ArtistsContainer artists={innerData} />,
          grid: <MusicsContainer musics={innerData} loading={false} />,
          playlists: <PlaylistsContainer playlists={innerData} loading={false} />,
          hero_sliders: <PlaylistsContainer playlists={innerData} loading={false} />,
          genres: <PlaylistsContainer playlists={innerData} loading={false} />,
          albums: <PlaylistsContainer playlists={innerData} loading={false} />,
        }[type]
      }
    </div>
  );
}

export default Vitrine;
