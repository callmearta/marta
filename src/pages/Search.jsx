import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaylistsContainer from '../components/PlaylistsContainer';
import MusicsContainer from '../components/MusicsContainer';
import ArtistsContainer from '../components/ArtistsContainer';
import AlbumsContainer from '../components/AlbumsContainer';
import Loading from '../components/Loading';
import * as Actions from '../store/search/actions';

function Search({
  match: { params: { query } }, fetchResult, result, loading,
}) {
  useEffect(() => {
    fetchResult(query);
  }, []);

  function renderItems() {
    return Object.keys(result).map((key) => {
      if (key !== 'clients' && result[key].length) {
        return (
          <section key={key}>
            <h2 className="section-title">{key.substring(0, 1).toUpperCase() + key.substring(1, key.length)}</h2>
            {
              {
                artists: <ArtistsContainer noSlide artists={result[key]} />,
                musics: <MusicsContainer musics={result[key]} />,
                albums: <AlbumsContainer albums={result[key]} />,
                playlists: <PlaylistsContainer noSlide playlists={result[key]} />,
              }[key]
            }
          </section>
        );
      }

      return null;
    });
  }

  function renderContent() {
    if (loading) {
      return <Loading loading />;
    }

    if (result) {
      return (
        <div className="search-columns">
          {renderItems()}
        </div>
      );
    }

    return null;
  }

  return (
    <main className="container">
      {renderContent()}
    </main>
  );
}

const mapStateToProps = (state) => ({
  result: state.searchReducer.result,
  loading: state.searchReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchResult: (query) => dispatch(Actions.fetchResult(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
