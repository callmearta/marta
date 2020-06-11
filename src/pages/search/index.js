import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as Actions from '../../state/actions/search';
import PlaylistsContainer from '../../ui/playlistsContainer';
import MusicsContainer from '../../ui/musicsContainer';
import ArtistsContainer from '../../ui/artistsContainer';
import AlbumsContainer from '../../ui/albumsContainer';
import Loading from '../../ui/loading';

function Search(props) {
    const query = props.match.params.query;
    const { fetchResult, result, loading } = props;

    useEffect(() => {
        fetchResult(query);
    }, []);

    return (
        <main className="container">
            {loading ? <Loading loading={true}></Loading> :
                result ? <div className="search-columns">
                    {Object.keys(result).map(key =>
                        key !== 'clients' && result[key].length ?
                            <section key={key}>
                                <h2 className="section-title">{key.substring(0, 1).toUpperCase() + key.substring(1, key.length)}</h2>
                                {
                                    {
                                        'artists': <ArtistsContainer noSlide artists={result[key]} />,
                                        'musics': <MusicsContainer musics={result[key]} />,
                                        'albums': <AlbumsContainer albums={result[key]} />,
                                        'playlists': <PlaylistsContainer noSlide playlists={result[key]} />
                                    }
                                    [key]
                                }
                            </section> : ''
                    )}
                </div> : ''
            }
        </main>
    );
}

const mapStateToProps = state => {
    return {
        result: state.searchReducer.result,
        loading: state.searchReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchResult: query => dispatch(Actions.fetchResult(query))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));