import Home from '../pages/home';
import Playlist from '../pages/playlist';
import Playlists from '../pages/playlists';
import Search from '../pages/search';
import Artist from '../pages/artist';
import Album from '../pages/album';

const Routes = [
    {
        routeName: 'home',
        component: Home,
        exact: true,
        path: '/'
    },
    {
        routeName: 'playlist',
        component: Playlist,
        exact: true,
        path: '/playlist/:id'
    },
    {
        routeName: 'playlists',
        component: Playlists,
        exact: true,
        path: '/playlists/:id'
    },
    {
        routeName: 'search',
        component: Search,
        exact: true,
        path: '/search/:query'
    },
    {
        routeName: 'region',
        component: Home,
        exact: true,
        path: '/region/:region'
    },
    {
        routeName: 'artist',
        component: Artist,
        exact: true,
        path: '/artist/:id'
    },
    {
        routeName: 'album',
        component: Album,
        exact: true,
        path: '/album/:id'
    }
];

export default Routes;