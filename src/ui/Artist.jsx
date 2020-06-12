import React from 'react';

import { withRouter } from 'react-router';

function Artist({ artist, history }) {
  return (
    <div className="artist-wrapper" onClick={() => history.push(`/artist/${artist.id}`)}>
      <div className="artist-wrapper__image">
        <img src={artist.image} alt={artist.name} />
      </div>
      <div className="artist-wrapper__body">
        <strong>{artist.name}</strong>
      </div>
    </div>
  );
}

export default withRouter(Artist);
