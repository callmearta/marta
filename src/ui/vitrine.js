import React from 'react';

import MusicsContainer from './musicsContainer';
import PlaylistsContainer from './playlistsContainer';

function Vitrine(props) {
    const { name, type, data } = props.data;

    return (
        <div className="vitrine-wrapper">
            <h2 className="vitrine-title">{name}</h2>
            {type === 'musics' ? <MusicsContainer musics={data} loading={false} /> : <PlaylistsContainer playlists={data} loading={false} />}
        </div>
    );
}

export default Vitrine;