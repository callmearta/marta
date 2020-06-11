import React from 'react';
import { withRouter, matchPath } from 'react-router';

import RegionHandler from '../helpers/region';

function Sidebar(props) {
    const currentRegion = matchPath(props.location.pathname, { path: '/region/:region' });

    return (
        <aside>
            <strong>Regions</strong>
            <ul>
                <li className={(!currentRegion || currentRegion.params.region === RegionHandler.global.name) ? 'active' : ''} onClick={() => props.history.push(`/region/${RegionHandler.global.name}`)}>
                    <i className="fal fa-globe-americas"></i>
                    Global
                </li>
                <li className={currentRegion && currentRegion.params.region === RegionHandler.persian.name ? 'active' : ''} onClick={() => props.history.push(`/region/${RegionHandler.persian.name}`)}>
                    <i className="fal fa-flag"></i>
                    Persian
                </li>
            </ul>
        </aside>
    );
}

export default withRouter(Sidebar);