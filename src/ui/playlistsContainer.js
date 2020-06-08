import React from 'react';
import Loading from './loading';

import Playlist from './playlist';

function PlaylistsContainer(props) {
    const { playlists, loading } = props;

    return (
        <Loading
            loading={loading}
        >
            <div className="musics-container playlists-container">
                <div className="musics-container__inner playlists-container__inner">
                    {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist} />)}
                </div>
            </div>
        </Loading>
    );
}

export default PlaylistsContainer;