import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Artist from './Artist';

function ArtistsContainer({ artists, noSlide }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 250,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className={`musics-container artists-container${noSlide ? ' no-slide' : ''}`}>
      {!noSlide && window.innerWidth > 1024
        ? (
          <Slider {...settings}>
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="slick-item-outer"
              >
                <Artist artist={artist} />
              </div>
            ))}
          </Slider>
        )
        : artists.map((artist) => (
          <div
            key={artist.id}
            className="slick-item-outer"
          >
            <Artist artist={artist} />
          </div>
        ))}
    </div>
  );
}

export default ArtistsContainer;
