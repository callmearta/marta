import axios from 'axios';

const API_URL = "https://cassetmusic.com/api/v1";

const onSuccessHandler = (res, resolve) => {
    return resolve(res.data);
}

const onErrorHandler = (err, resolve) => {
    if (err.response) {
        resolve(err.response.data);
    }
    return console.error(err);
}

const Api = {
    getMusics: () => {
        return new Promise((resolve) => {
            axios({
                url: `${API_URL}/musics`,
                method: 'GET'
            }).then(res => onSuccessHandler(res, resolve)).catch(err => onErrorHandler(err, resolve));
        });
    },
    getPlaylistsVitrines: (count = 10, region = 'us') => {
        return new Promise((resolve) => {
            axios({
                url: `${API_URL}/playlists/vitrines?count=${count}&region=${region}`,
                method: 'GET'
            }).then(res => onSuccessHandler(res, resolve)).catch(err => onErrorHandler(err, resolve));
        });
    }
};

export default Api;