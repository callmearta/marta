import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';

import Logo from '../assets/images/logo.svg';

function Header(props) {
    const path = matchPath(props.location.pathname, { path: '/search/:query' });
    const [query, setQuery] = useState(path ? path.params.query : '');
    const timeout = useRef();

    const onInputChange = (query) => {
        setQuery(query);
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(function () {
            props.history.push(`/search/${query}`)
        }, 500);
    };

    return (
        <header>
            <div className="container d-flex align-items-center justify-content-start">
                <Link to={'/'} title="Casset, Latest and Trend Musics" target="_self"><img src={Logo} alt="Casset" /></Link>
                <small>Enjoy music without borders!</small>
                <div className="search-wrapper">
                    <input type="text" placeholder="Looking for something?" onChange={evt => onInputChange(evt.target.value)} value={query} />
                    <i className="fal fa-search"></i>
                </div>
            </div>
        </header>
    );
}

export default withRouter(Header);