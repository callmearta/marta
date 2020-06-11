import React from 'react';
import { connect } from 'react-redux';

import Loading from './loading';
import Music from './music';
import * as PlayerActions from '../state/actions/player';

function MusicSlider(props) {
    const { musics, loading, title, setCurrentPlaylist } = props;

    const handlePlaylist = () => {
        setCurrentPlaylist(musics.reduce((p1, p2) => {
            return p1.find(t => t.id === p2.id) ? p1 : [...p1, p2]
        }, []));
    }

    return (
        <Loading
            loading={loading}
        >
            <h2 className="section-title">{title}</h2>
            <div className="musics-container">
                <div className="musics-container__inner">
                    {musics.map((music, i) => <Music setCurrentPlaylist={handlePlaylist} key={i} music={music} />)}
                </div>
            </div>
        </Loading>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentPlaylist: playlist => dispatch(PlayerActions.setPlaylist(playlist))
    };
};

export default connect(null, mapDispatchToProps)(MusicSlider);