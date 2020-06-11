import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Track from '../ui/Track';
import MusicsContainer from '../ui/MusicsContainer';
import Api from '../helpers/api';
import Loading from '../ui/Loading';
import PlaylistsContainer from '../ui/PlaylistsContainer';
import ArtistsContainer from '../ui/ArtistsContainer';
import * as PlayerActions from '../state/actions/player';

function Artist({ match, history, setCurrentPlaylist }) {
  const artistId = match.params.id;
  const [artist, setArtist] = useState({
    data: {},
    loading: true,
  });

  const fetchArtist = async () => {
    setArtist({ ...artist, loading: true });
    const result = await Api.getArtist(artistId);
    if (result.success) {
      setArtist({
        data: {
          ...result.data,
          top_songs: result.data.top_songs.length
            ? result.data.top_songs.reduce((p1, p2) => (p1.find((track) => track.id === p2.id)
              ? p1
              : [...p1, p2]), [])
            : [],
          last_songs: result.data.last_songs.length
            ? result.data.last_songs.reduce((p1, p2) => (p1.find((track) => track.id === p2.id)
              ? p1
              : [...p1, p2]), [])
            : [],
        },
        loading: false,
      });
    } else {
      history.replace('/');
    }
  };

  const handlePlaylist = () => {
    setCurrentPlaylist([
      ...artist.data.top_songs,
      ...artist.data.last_songs,
    ].reduce((p1, p2) => (p1.find((t) => t.id === p2.id) ? p1 : [...p1, p2]), []));
  };

  useEffect(() => {
    if (artistId) {
      fetchArtist();
    }
  }, []);

  return (
    <main className="container artist-page">
      {artist.loading ? <Loading loading={artist.loading} /> : (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column">
            <div className="circle-image">
              <img src={artist.data.artist.image} alt={artist.data.artist.name} />
            </div>
            <h1>{artist.data.artist.name}</h1>
          </div>
          {artist.data.top_songs.length
            ? (
              <section>
                <h2 className="section-title">Top Songs</h2>
                <MusicsContainer musics={artist.data.top_songs} />
              </section>
            )
            : ''}
          {artist.data.last_songs.length
            ? (
              <section>
                <h2 className="section-title">Latest Songs</h2>
                {artist.data.last_songs
                  .map((music) => (
                    <Track
                      setCurrentPlaylist={handlePlaylist}
                      music={music}
                      key={music.id}
                    />
                  ))}
              </section>
            )
            : ''}
          {artist.data.playlists.length
            ? (
              <section>
                <h2 className="section-title">Playlists</h2>
                <PlaylistsContainer playlists={artist.data.playlists} />
              </section>
            )
            : ''}
          {artist.data.albums.length
            ? (
              <section>
                <h2 className="section-title">Albums</h2>
                <PlaylistsContainer playlists={artist.data.albums} />
              </section>
            )
            : ''}
          {artist.data.related_artist.length
            ? (
              <section>
                <h2 className="section-title">Related Artists</h2>
                <ArtistsContainer artists={artist.data.related_artist} />
              </section>
            )
            : ''}
        </>
      )}
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentPlaylist: (playlist) => dispatch(PlayerActions.setPlaylist(playlist)),
});

export default connect(null, mapDispatchToProps)(withRouter(Artist));
