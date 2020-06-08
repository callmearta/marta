import React from 'react';

function Playlist(props) {
    const { playlist } = props;

    return (
        <div className="music-wrapper playlist-wrapper">
            <div className="music-wrapper__image playlist-wrapper__image">
                <img src={playlist.image} alt={playlist.name} />
            </div>
            <div className="music-wrapper__body playlist-wrapper__body">
                <strong>{playlist.name}</strong>
            </div>
        </div>
    );
}

export default Playlist;