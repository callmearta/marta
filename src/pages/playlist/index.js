import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Track from '../../ui/track';
import Api from '../../helpers/api';
import Loading from '../../ui/loading';
import PlaylistsContainer from '../../ui/playlistsContainer';

import * as PlayerActions from '../../state/actions/player';

function Playlist(props) {
    const { setCurrentPlaylist } = props;
    const [playlistId] = useState(props.match.params.id);
    const [playlist, setPlaylist] = useState({
        data: {},
        loading: true
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
                        musics: result.data.musics.reduce((p1, p2) => {
                            return p1.find(t => t.id === p2.id) ? p1 : [...p1, p2]
                        }, [])
                    }
                    , loading: false
                });
            } else {
                setPlaylist({ data: result.data, loading: false });
            }
        } else {
            props.history.replace('/');
        }
    };

    const handlePlaylist = () => {
        setCurrentPlaylist(playlist.data.musics.reduce((p1, p2) => {
            return p1.find(t => t.id === p2.id) ? p1 : [...p1, p2]
        }, []));
    }

    useEffect(() => {
        if (playlistId) {
            fetchPlaylist();
        }
    }, []);

    return (
        <main className="container">
            {playlist.loading ? <Loading loading={playlist.loading}></Loading> :
                playlist.data.musics ? <React.Fragment>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className="circle-image">
                            <img src={playlist.data.playlist.image} alt={playlist.data.playlist.name} />
                        </div>
                        <h1>{playlist.data.playlist.name}</h1>
                        <small className="playlist-artists mt-5">{playlist.data.artists.map((artist, i) => artist.name + (i !== playlist.data.artists.length - 1 ? ', ' : ''))}</small>
                        <div className="tags-wrapper">
                            {playlist.data.categories.map((category, i) => <span key={i} className="tag">{category.name}</span>)}
                        </div>
                    </div>
                    <div className="tracks-wrapper">
                        {playlist.data.musics.map((music, i) => <Track setCurrentPlaylist={handlePlaylist} music={music} key={i} />)}
                    </div>
                </React.Fragment> :
                    <React.Fragment>
                        <h1 className="section-title">Playlists</h1>
                        <PlaylistsContainer playlists={playlist.data} />
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

export default connect(null, mapDispatchToProps)(withRouter(Playlist));