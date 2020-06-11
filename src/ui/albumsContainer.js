import React from 'react';

import Album from './album';

function AlbumsContainer(props) {
    const { albums } = props;

    return (
        <div className="musics-container">
            <div className="musics-container__inner">
                {albums.map((album, i) => <Album key={i} album={album} />)}
            </div>
        </div>
    );
}

export default AlbumsContainer;