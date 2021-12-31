//引入vue-router路由插件
import VueRouter from 'vue-router'
//引入Vue
import Vue from 'vue'
import routes from './routes'
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)
// import Index from '../views/index/Index.vue'
// import Login from '../views/login/Login'
// import Discover from '../views/index/Discover.vue'
// import TopList from '../views/topList/TopList.vue'
// import PlayList from '../views/playlist/PlayList.vue'
// import SongDetail from '../views/playlist/SongDetail.vue'
// import Mv from '../views/Mv/Mv.vue'
// import MvList from '../views/Mv/MvList.vue'
// import Artist from '../views/artist/Artist.vue'
// import ArtistDetail from '../views/artist/ArtistDetail.vue'
// import Singer from '../views/artist/singer.vue'
// import Album from '../views/album/Album.vue'
// import AlbumDetail from '../views/album/AlbumDetail.vue'
// import MusicDetail from '../views/index/MusicDetail.vue'
// import Search from '../views/index/Search.vue'

const router = new VueRouter({
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 挂载路由导航守卫
router.beforeEach(async (to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next() 函数，放行
  // if (to.path === '/login') return next()
  // 获取token
  const token = store.state.loginData.token
  const name = store.state.loginData.name
  //用户登录了
  if (token) {
    // Vue.prototype.$message.success('已成功登录！')
    //已经登录而且还想去登录------不行
    if (to.path == '/login') {
      next('/')
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next()
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('getUserData')
          next()
        } catch (error) {
          //token失效从新登录
          store.commit('outLogin')
          next('/login')
        }
      }
    }
  } else {
    // let fromPath = from.path
    // if (to.path === '/login') {
    //   //当未登录的时候，去而没有去成的信息，存储于地址栏中【路由】
    //   next()
    // }
    Vue.prototype.$message.info('没有登录，请先登录哦！')
    next()
  }
  if (to.path === 'toplist') {
    store.state.songList.length = 4
    next()
  }
})

export default router
