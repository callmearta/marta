import React from 'react';

import Logo from '../assets/images/logo.svg';

function Header(props) {
    return (
        <header>
            <div className="container d-flex align-items-center justify-content-start">
                <img src={Logo} alt="Casset" />
                <small>Enjoy music without borders!</small>
            </div>
        </header>
    );
}

export default Header;