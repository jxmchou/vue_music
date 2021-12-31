// @ts-nocheck
const Index = () =>
  import(
    /* webpackChunkName: "login_index_discover" */ '@/views/index/Index.vue'
  )
const Login = () =>
  import(/* webpackChunkName: "login_index_discover" */ '@/views/login/Login')
const TopList = () =>
  import(
    /* webpackChunkName: "topList_playlist_songDetail" */ '@/views/topList/TopList.vue'
  )
const PlayList = () =>
  import(
    /* webpackChunkName: "topList_playlist_songDetail" */ '@/views/playlist/PlayList.vue'
  )
const SongDetail = () =>
  import(
    /* webpackChunkName: "topList_playlist_songDetail" */ '@/views/playlist/SongDetail.vue'
  )
const Mv = () => import(/* webpackChunkName: "mv_mvList" */ '@/views/Mv/Mv.vue')
const MvList = () =>
  import(/* webpackChunkName: "mv_mvList" */ '@/views/Mv/MvList.vue')
const Artist = () =>
  import(
    /* webpackChunkName: "artist_ArtistDetail_singer" */ '@/views/artist/Artist.vue'
  )
const ArtistDetail = () =>
  import(
    /* webpackChunkName: "artist_ArtistDetail_singer" */ '@/views/artist/ArtistDetail.vue'
  )
const Singer = () =>
  import(
    /* webpackChunkName: "artist_ArtistDetail_singer" */ '@/views/artist/singer.vue'
  )
const Album = () =>
  import(/* webpackChunkName: "album_AlbumDetail" */ '@/views/album/Album.vue')
const AlbumDetail = () =>
  import(
    /* webpackChunkName: "album_AlbumDetail" */ '@/views/album/AlbumDetail.vue'
  )
const MusicDetail = () =>
  import(/* webpackChunkName: "MusicDetail" */ '@/views/index/MusicDetail.vue')
const Search = () =>
  import(/* webpackChunkName: "Search" */ '@/views/index/Search.vue')
export default [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Index,
    redirect: '/home/discover',
    children: [
      {
        path: 'discover',
        component: () => import('@/views/index/Discover.vue')
      },
      { path: 'toplist', component: TopList },
      { path: 'playlist', component: PlayList },
      { path: 'songdetail/:id', component: SongDetail, name: 'SongDetail' },
      { path: 'mv', component: Mv },
      { path: 'mvlist/:id', component: MvList, name: 'MvList' },
      { path: 'artist', component: Artist },
      {
        path: 'artistdetail/:id',
        component: ArtistDetail,
        name: 'ArtistDetail'
      },
      { path: 'album', component: Album },
      { path: 'albumdetail/:id', component: AlbumDetail, name: 'AlbumDetail' },
      { path: 'singer', component: Singer },
      { path: 'song/:id', component: MusicDetail, name: 'MusicDetail' },
      { path: 'search/:word', component: Search, name: 'Search' }
    ]
  },
  { path: '/404', component: () => import('@/views/404.vue') },
  // { path: '*', component: () => import('@/views/404.vue') },
  { path: '/test', component: () => import('@/views/test.vue') }
]
