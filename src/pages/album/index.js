import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MusicsContainer from '../../ui/musicsContainer';
import Api from '../../helpers/api';
import Loading from '../../ui/loading';

import * as PlayerActions from '../../state/actions/player';

function Album(props) {
    const albumId = props.match.params.id;
    const [album, setAlbum] = useState({
        data: {},
        loading: true
    });

    const fetchAlbum = async () => {
        setAlbum({ ...album, loading: true });
        const result = await Api.getAlbum(albumId);
        if (result.success) {
            setAlbum({
                data: result.data, loading: false
            });
        } else {
            props.history.replace('/');
        }
    };

    useEffect(() => {
        if (albumId) {
            fetchAlbum();
        }
    }, []);

    return (
        <main className="container album-page">
            {album.loading ? <Loading loading={album.loading}></Loading> :
                <React.Fragment>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className="circle-image">
                            <img src={album.data.album.image} alt={album.data.album.name} />
                        </div>
                        <h1>{album.data.album.name}</h1>
                        <small className="playlist-artists mt-5">{album.data.album.artists.map((artist, i) => artist.name + (i !== album.data.album.artists.length - 1 ? ', ' : ''))}</small>
                    </div>
                    {album.data.musics.length ?
                        <section>
                            <h2 className="section-title">Songs</h2>
                            <MusicsContainer musics={album.data.musics} />
                        </section>
                        : ''}
                </React.Fragment>
            }
        </main>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentPlaylist: playlist => dispatch(PlayerActions.setPlaylist(playlist))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Album));