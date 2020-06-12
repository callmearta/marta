import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Track from '../ui/Track';
import Loading from '../ui/Loading';
import PlaylistsContainer from '../ui/PlaylistsContainer';
import Api from '../helpers/api';

import * as PlayerActions from '../state/actions/player';

function Playlist({ setCurrentPlaylist, match, history }) {
  const [playlistId] = useState(match.params.id);
  const [playlist, setPlaylist] = useState({
    data: {},
    loading: true,
  });

  const fetchPlaylist = async () => {
    setPlaylist({ ...playlist, loading: true });
    const result = await Api.getPlaylistById(playlistId);
    if (result.success) {
      if (result.data.musics) {
        // Removing Duplicate ID musics
        setPlaylist({
          data: {
            ...result.data,
            musics: result.data.musics
              .reduce((p1, p2) => (p1.find((t) => t.id === p2.id) ? p1 : [...p1, p2]), []),
          },
          loading: false,
        });
      } else {
        setPlaylist({ data: result.data, loading: false });
      }
    } else {
      history.replace('/');
    }
  };

  const handlePlaylist = () => {
    setCurrentPlaylist(
      playlist.data.musics
        .reduce((p1, p2) => (p1.find((t) => t.id === p2.id) ? p1 : [...p1, p2]), []),
    );
  };

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, []);

  function renderPlaylists() {
    if (playlist.data.musics) {
      return (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column">
            <div className="circle-image">
              <img src={playlist.data.playlist.image} alt={playlist.data.playlist.name} />
            </div>
            <h1>{playlist.data.playlist.name}</h1>
            <small className="playlist-artists mt-5">{playlist.data.artists.map((artist, i) => artist.name + (i !== playlist.data.artists.length - 1 ? ', ' : ''))}</small>
            <div className="tags-wrapper">
              {playlist.data.categories.map((category) => <span key={category.id} className="tag">{category.name}</span>)}
            </div>
          </div>
          <div className="tracks-wrapper">
            {playlist.data.musics
              .map((music) => (
                <Track
                  setCurrentPlaylist={handlePlaylist}
                  music={music}
                  key={music.id}
                />
              ))}
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="section-title">Playlists</h1>
        <PlaylistsContainer playlists={playlist.data} />
      </>
    );
  }

  function renderContent() {
    if (playlist.loading) {
      return <Loading loading={playlist.loading} />;
    }

    return renderPlaylists();
  }

  return (
    <main className="container">
      {renderContent()}
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentPlaylist: (playlist) => dispatch(PlayerActions.setPlaylist(playlist)),
});

export default connect(null, mapDispatchToProps)(withRouter(Playlist));
