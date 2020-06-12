import React from 'react';

import Album from './Album';

function AlbumsContainer({ albums }) {
  return (
    <div className="musics-container">
      <div className="musics-container__inner">
        {albums.map((album) => (
          <Album
            key={album.id}
            album={album}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumsContainer;
