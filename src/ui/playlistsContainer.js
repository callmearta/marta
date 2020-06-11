import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Playlist from './playlist';

function PlaylistsContainer(props) {
    const { playlists } = props;

    let settings = {
        dots: false,
        infinite: false,
        speed: 250,
        slidesToScroll: 1,
        variableWidth: true
    };

    return (
        <div className={"musics-container playlists-container" + (props.noSlide ? ' no-slide' : '')}>
            {!props.noSlide && window.innerWidth > 1024 ?
                <Slider {...settings}>
                    {playlists.map((playlist, i) => <div key={i} className="slick-item-outer"><Playlist playlist={playlist} /></div>)}
                </Slider> :
                playlists.map((playlist, i) => <div key={i} className="slick-item-outer"><Playlist playlist={playlist} /></div>)
            }
        </div>
    );
}

export default PlaylistsContainer;