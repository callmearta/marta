import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Track from '../../ui/track';
import Api from '../../helpers/api';
import Loading from '../../ui/loading';
import PlaylistsContainer from '../../ui/playlistsContainer';

function Playlist(props) {
    const playlistId = props.match.params.id;
    const [playlist, setPlaylist] = useState({
        data: {},
        loading: true
    });

    const fetchPlaylist = async () => {
        setPlaylist({ ...playlist, loading: true });
        const result = await Api.getPlaylistById(playlistId);
        if (result.success) {
            setPlaylist(result.data);
        } else {
            props.history.replace('/');
        }
    };

    useEffect(() => {
        if (playlistId) {
            fetchPlaylist();
        }
    }, []);

    return (
        <main className="container">
            <PlaylistsContainer playlists={playlist.data} loading={false} />
        </main>
    );
}

export default withRouter(Playlist);