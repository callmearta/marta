import React from 'react';
import { withRouter } from 'react-router-dom';

function Playlist(props) {
    const { playlist } = props;

    return (
        <div className="music-wrapper playlist-wrapper" onClick={() => props.history.push(`/playlist/${playlist.id}`)}>
            <div className="music-wrapper__image playlist-wrapper__image">
                <img src={playlist.image} alt={playlist.name} />
            </div>
            <div className="music-wrapper__body playlist-wrapper__body">
                <strong>{playlist.name}</strong>
            </div>
        </div>
    );
}

export default withRouter(Playlist);