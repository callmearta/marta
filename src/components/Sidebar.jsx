import React from 'react';
import { withRouter, matchPath } from 'react-router';
import RegionHandler from '../helpers/region';

function Sidebar({ location, history }) {
  const currentRegion = matchPath(location.pathname, { path: '/region/:region' });

  return (
    <aside>
      <strong>Regions</strong>
      <ul>
        <li
          className={(!currentRegion || currentRegion.params.region === RegionHandler.global.name)
            ? 'active'
            : ''}
          onClick={() => history.push(`/region/${RegionHandler.global.name}`)}
        >
          <i className="fal fa-globe-americas" />
          Global
        </li>
        <li
          className={currentRegion && currentRegion.params.region === RegionHandler.persian.name
            ? 'active'
            : ''}
          onClick={() => history.push(`/region/${RegionHandler.persian.name}`)}
        >
          <i className="fal fa-flag" />
          Persian
        </li>
      </ul>
    </aside>
  );
}

export default withRouter(Sidebar);
