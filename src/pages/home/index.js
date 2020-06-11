import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import MusicsContainer from '../../ui/musicsContainer';
import Vitrine from '../../ui/vitrine';
import * as Actions from '../../state/actions/home';
import Loading from '../../ui/loading';

function Home(props) {
    const { homeState, fetchMusicsFind, fetchVitrines } = props;
    const currentRegion = props.match.params.region || 'global';

    useEffect(() => {
        if (!homeState[currentRegion].musicsFind.data.length) {
            fetchMusicsFind(currentRegion);
        }
        if (!homeState[currentRegion].vitrines.data.length) {
            fetchVitrines(currentRegion);
        }
    }, []);

    return (
        <main className="container">
            <MusicsContainer title="Discover New Music" musics={homeState[currentRegion].musicsFind.data} loading={homeState[currentRegion].musicsFind.loading} />
            {homeState[currentRegion].vitrines.loading ? <Loading loading={true} ></Loading> :
                homeState[currentRegion].vitrines.data.map((vitrine, i) =>
                    vitrine.type === 'hero_sliders' ?
                        <Vitrine hero key={i} data={vitrine} /> :
                        <Vitrine key={i} data={vitrine} />)
            }
        </main>
    );
}

const mapStateToProps = state => {
    return {
        homeState: state.homeReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMusicsFind: region => dispatch(Actions.fetchMusicsFind(region)),
        fetchVitrines: region => dispatch(Actions.fetchVitrines(region))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));