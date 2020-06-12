import React, { useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import Logo from '../assets/images/logo.svg';

function Header({ location, history }) {
  const path = matchPath(location.pathname, { path: '/search/:query' });
  const [query, setQuery] = useState(path ? path.params.query : '');
  const timeout = useRef();

  const onInputChange = (queryValue) => {
    setQuery(queryValue);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      history.push(`/search/${queryValue}`);
    }, 500);
  };

  return (
    <header>
      <div className="container d-flex align-items-center justify-content-start">
        <Link to="/" title="Casset, Latest and Trend Musics" target="_self">
          <img src={Logo} alt="Casset" />
        </Link>
        <small>Enjoy music without borders!</small>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Looking for something?"
            onChange={(evt) => onInputChange(evt.target.value)}
            value={query}
          />
          <i className="fal fa-search" />
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
