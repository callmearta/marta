import axios from 'axios';

const API_URL = 'https://cassetmusic.com/api/v1';

const onSuccessHandler = (res, resolve) => resolve(res.data);

const onErrorHandler = (err, resolve) => {
  if (err.response) {
    resolve(err.response.data);
  }
  return console.error(err);
};

const Api = {
  getMusics: (region = 'us') => new Promise((resolve) => {
    axios({
      url: `${API_URL}/musics?region=${region}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
  getPlaylistsVitrines: (region = 'us', count = 10) => new Promise((resolve) => {
    axios({
      url: `${API_URL}/playlists/vitrines?count=${count}&region=${region}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
  getPlaylistById: (id) => new Promise((resolve) => {
    axios({
      url: `${API_URL}/playlist?id=${id}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
  getSearch: (query) => new Promise((resolve) => {
    axios({
      url: `${API_URL}/search?name=${query}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
  getArtist: (id) => new Promise((resolve) => {
    axios({
      url: `${API_URL}/artist?id=${id}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
  getAlbum: (id) => new Promise((resolve) => {
    axios({
      url: `${API_URL}/album?id=${id}`,
      method: 'GET',
    }).then((res) => onSuccessHandler(res, resolve)).catch((err) => onErrorHandler(err, resolve));
  }),
};

export default Api;
