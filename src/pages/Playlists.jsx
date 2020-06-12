import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PlaylistsContainer from '../components/PlaylistsContainer';
import Api from '../api';

function Playlist({ match, history }) {
  const playlistId = match.params.id;
  const [playlist, setPlaylist] = useState({
    data: {},
    loading: true,
  });

  const fetchPlaylist = async () => {
    setPlaylist({ ...playlist, loading: true });
    const result = await Api.getPlaylistById(playlistId);
    if (result.success) {
      setPlaylist(result.data);
    } else {
      history.replace('/');
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
