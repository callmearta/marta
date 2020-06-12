import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Playlist from './Playlist';

function PlaylistsContainer({ playlists, noSlide }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 250,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className={`musics-container playlists-container${noSlide ? ' no-slide' : ''}`}>
      {!noSlide && window.innerWidth > 1024
        ? (
          <Slider {...settings}>
            {playlists
              .map((playlist) => (
                <div
                  key={playlist.id}
                  className="slick-item-outer"
                >
                  <Playlist playlist={playlist} />
                </div>
              ))}
          </Slider>
        )
        : playlists
          .map((playlist) => (
            <div
              key={playlist.id}
              className="slick-item-outer"
            >
              <Playlist playlist={playlist} />
            </div>
          ))}
    </div>
  );
}

export default PlaylistsContainer;
