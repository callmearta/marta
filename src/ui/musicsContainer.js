import React from 'react';
import Loading from './loading';

import Music from './music';

function MusicSlider(props) {
    const { musics, loading } = props;

    return (
        <Loading
            loading={loading}
        >
            <div className="musics-container">
                <div className="musics-container__inner">
                    {musics.map((music, i) => <Music key={i} music={music} />)}
                </div>
            </div>
        </Loading>
    );
}

export default MusicSlider;