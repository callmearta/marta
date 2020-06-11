import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Artist from './artist';

function ArtistsContainer(props) {
    const { artists } = props;

    let settings = {
        dots: false,
        infinite: false,
        speed: 250,
        slidesToScroll: 1,
        variableWidth: true
    };

    return (
        <div className={"musics-container artists-container" + (props.noSlide ? ' no-slide' : '')}>
            {!props.noSlide && window.innerWidth > 1024 ?
                <Slider {...settings}>
                    {artists.map((artist, i) => <div key={i} className="slick-item-outer"><Artist artist={artist} /></div>)}
                </Slider> :
                artists.map((artist, i) => <div key={i} className="slick-item-outer"><Artist artist={artist} /></div>)
            }
        </div>
    );
}

export default ArtistsContainer;