import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入懒加载插件 vue-lazyload
import VueLazyload from 'vue-lazyload'

// 导入filter混入过滤器
import mixins from '../src/common/mixin'
Vue.mixin(mixins)

Vue.config.productionTip = false

const loadimage = require('./assets/success1.jpg')
const errorimage = require('./assets/nvsheng.jpg')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')
