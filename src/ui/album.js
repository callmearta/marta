import React from 'react';
import { withRouter } from 'react-router-dom';

function Album(props) {
    const { album } = props;

    return (
        <div className="music-wrapper" onClick={() => props.history.push(`/album/${album.id}`)}>
            <div className="music-wrapper__image">
                <img src={album.image} alt={album.title} />
            </div>
            <div className="music-wrapper__body">
                <strong>{album.name}</strong>
                <small>{album.artists.length > 1 ? album.artists.map((artist, i) => artist.name + (i !== album.artists.length - 1 ? ', ' : '')) : album.artists[0].name}</small>
            </div>
        </div>
    );
}

export default withRouter(Album);