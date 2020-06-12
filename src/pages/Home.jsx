import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MusicsContainer from '../components/MusicsContainer';
import Vitrine from '../components/Vitrine';
import Loading from '../components/Loading';
import * as Actions from '../store/home/actions';

function Home({
  match, homeState, fetchMusicsFind, fetchVitrines,
}) {
  const currentRegion = match.params.region || 'global';

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
      {homeState[currentRegion].vitrines.loading ? <Loading loading />
        : homeState[currentRegion].vitrines.data.map((vitrine) => (vitrine.type === 'hero_sliders'
          ? <Vitrine hero key={vitrine.id} data={vitrine} />
          : <Vitrine key={vitrine.id} data={vitrine} />))}
    </main>
  );
}

const mapStateToProps = ({
  homeReducer,
}) => ({
  homeState: homeReducer,
});

const mapDispatchToProps = {
  fetchMusicsFind: Actions.fetchMusicsFind,
  fetchVitrines: Actions.fetchVitrines,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
