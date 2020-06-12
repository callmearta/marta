import Home from '../pages/Home';
import Playlist from '../pages/Playlist';
import Playlists from '../pages/Playlists';
import Search from '../pages/Search';
import Artist from '../pages/Artist';
import Album from '../pages/Album';

const Routes = [
  {
    routeName: 'home',
    Component: Home,
    exact: true,
    path: '/',
  },
  {
    routeName: 'playlist',
    Component: Playlist,
    exact: true,
    path: '/playlist/:id',
  },
  {
    routeName: 'playlists',
    Component: Playlists,
    exact: true,
    path: '/playlists/:id',
  },
  {
    routeName: 'search',
    Component: Search,
    exact: true,
    path: '/search/:query',
  },
  {
    routeName: 'region',
    Component: Home,
    exact: true,
    path: '/region/:region',
  },
  {
    routeName: 'artist',
    Component: Artist,
    exact: true,
    path: '/artist/:id',
  },
  {
    routeName: 'album',
    Component: Album,
    exact: true,
    path: '/album/:id',
  },
];

export default Routes;
