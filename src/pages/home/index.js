import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MusicsContainer from '../../ui/musicsContainer';
import Vitrine from '../../ui/vitrine';
import * as Actions from '../../state/actions/home';

function Home(props) {
    const { musicsFind, vitrines, fetchMusicsFind, fetchVitrines } = props;

    useEffect(() => {
        fetchMusicsFind();
        fetchVitrines();
    }, []);

    return (
        <main className="container">
            <h2 className="section-title">Discover New Music</h2>
            <MusicsContainer musics={musicsFind.data} loading={musicsFind.loading} />
            {vitrines.data.map(vitrine => <Vitrine data={vitrine} />)}
        </main>
    );
}

const mapStateToProps = state => {
    return {
        musicsFind: state.homeReducer.musicsFind,
        vitrines: state.homeReducer.vitrines
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMusicsFind: () => dispatch(Actions.fetchMusicsFind()),
        fetchVitrines: () => dispatch(Actions.fetchVitrines())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);