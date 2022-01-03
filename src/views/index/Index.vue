<template>
  <el-container>
    <!-- 头部区域 -->
    <!-- <div class="box"> -->
    <el-header>
      <ul>
        <li><img src="@/assets/logo.png" alt="logo" /></li>
        <li><span>网抑云音乐</span></li>
        <li>
          <el-input
            v-if=""
            class="input"
            v-model="value"
            placeholder="音乐/电台/视频/用户"
            prefix-icon="el-icon-search"
            clearable
            @change="handSearch(value)"
            @input="searchText(value)"
            @focus="handFocus(value)"
            @blur="handBlur(value)"
            ref="input"
          ></el-input>
          <!-- 搜索建议 -->
          <div
            v-if="suggestData.order"
            class="searchBox"
            :style="changeIndex ? 'display: block' : 'display: none;'"
          >
            <div class="box1">
              <div class="bf">
                <i class="el-icon-service"></i>
                单曲
              </div>
              <div class="br">
                <div
                  class="brItem"
                  v-for="item in suggestData.songs"
                  :key="item.id"
                >
                  <a :href="`#/home/song/${item.id}`"
                    >{{ item.name
                    }}<span> - {{ item.artists[0].name }}</span></a
                  >
                </div>
              </div>
            </div>
            <div class="box2">
              <div class="bf">
                <i class="el-icon-s-custom"></i>
                歌手
              </div>
              <div class="br">
                <a :href="`#/home/artistdetail/${suggestData.artists[0].id}`">{{
                  suggestData.artists[0].name
                }}</a>
              </div>
            </div>
            <div class="box3" v-if="suggestData.albums">
              <div class="bf">
                <i class="el-icon-folder-opened"></i>
                专辑
              </div>
              <div class="br">
                <div
                  class="brItem"
                  v-for="item in suggestData.albums"
                  :key="item.id"
                >
                  <a :href="`#/home/albumdetail/${item.id}`"
                    >{{ item.name }}<span> - {{ item.artist.name }}</span></a
                  >
                </div>
              </div>
            </div>
            <div class="box4" v-if="suggestData.playlists">
              <div class="bf">
                <i class="el-icon-s-order"></i>
                歌单
              </div>
              <div class="br">
                <div
                  class="brItem"
                  v-for="item in suggestData.playlists"
                  :key="item.id"
                >
                  <a :href="`#/home/songdetail/${item.id}`">{{ item.name }}</a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <el-button
            title="回退"
            icon="el-icon-arrow-left "
            circle
            @click="back"
          ></el-button>
          <el-button
            title="前进"
            icon="el-icon-arrow-right "
            circle
            @click="forward"
          ></el-button>
        </li>
      </ul>
      <ol>
        <li>
          <el-switch v-model="value0" inactive-text="侧边栏"> </el-switch>
        </li>
        <li>
          <el-switch
            v-model="value1"
            inactive-text="音乐栏"
            @change="changeValue(value1)"
          >
          </el-switch>
        </li>
        <li>
          <el-switch
            style="display: block"
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            inactive-text="mini音乐栏"
            @change="changeValue2(value2)"
          >
          </el-switch>
        </li>
        <li>
          <Avatar />
        </li>
        <li class="li5">
          <a
            href="https://gitee.com/mchou"
            class="a1"
            title="Gitee代码"
            target="_Blank"
            ><i class="iconfont icon-gitee"></i></a
          ><a
            href="https://github.com/jxmchou"
            class="a2"
            title="GitHub代码"
            target="_Blank"
            ><i class="iconfont icon-GitHub"></i
          ></a>
        </li>
        <li>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">
                <a href="http://admin.ychzx.top" target="_blank"
                  >后台管理项目地址</a
                >
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">
                <a href="https://neteasecloudmusicapi.js.org/#/" target="_blank"
                  >网易云接口官方文档</a
                >
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">
                <a href="http://ychzx.top" target="_blank"
                  >前端学习网站（待完善）</a
                >
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">
                <a href="http://shop.ychzx.top" target="_blank"
                  >尚品汇前台商城项目</a
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ol>
    </el-header>
    <!-- </div> -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="!value0 ? '0px' : '200px'">
        <el-menu
          active-text-color="#ff4949"
          :collapse="!value0"
          :collapse-transition="false"
          style="border: 0"
          router
          :default-active="activePath"
        >
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :index="item.path"
            @click="toPath(item.path)"
            style="font-size: 13px"
          >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <el-backtop target=".el-main" :bottom="90" :right="60">
          <i class="el-icon-thumb"></i>
        </el-backtop>
        <!-- <div
            style="height: 620px"
            v-infinite-scroll="load"
            infinite-scroll-delay="300"
          > -->

        <!-- 路由占位 -->
        <router-view></router-view>
        <!-- </div> -->
        <!-- 返回顶部组件 -->
        <!-- <GoTop /> -->
      </el-main>
    </el-container>
    <!-- 引入音乐播放组件 -->
    <PlayMusic />
  </el-container>
</template>

<script>
import { debounce } from '@/common/utils'
import PlayMusic from '@/components/playMusic.vue'
import Avatar from '@/components/avatar.vue'
// import GoTop from './GoTop.vue'
import { searchSuggest } from '@/common/searchAPI'
export default {
  name: 'Index',
  data() {
    return {
      value: '',
      value0: true,
      value1: true,
      value2: true,
      activePath: '', // 被激活的连接地址
      // 菜单数据
      menuList: [
        { icon: 'el-icon-menu', name: '热门推荐', path: '/home/discover' },
        { icon: 'el-icon-s-data', name: '排行榜', path: '/home/toplist' },
        { icon: 'el-icon-document', name: '歌单', path: '/home/playlist' },
        {
          icon: 'el-icon-video-camera-solid',
          name: 'MV视频',
          path: '/home/mv'
        },
        { icon: 'el-icon-place', name: '歌手', path: '/home/artist' },
        { icon: 'el-icon-service', name: '新碟上架', path: '/home/album' }
      ],
      suggestData: {
        albums: [],
        artists: [],
        songs: [],
        playlists: []
      }, // 搜索建议数据
      changeIndex: false
    }
  },
  components: {
    // GoTop,
    Avatar,
    PlayMusic
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {
    if (this.$route.path === '/home/discover') {
      this.activePath = '/home/discover'
    }
    if (window.sessionStorage.getItem('loginData')) {
      this.$store.state.loginData = JSON.parse(
        window.sessionStorage.getItem('loginData')
      )
    }

    // console.log(this.$store.state);
  },
  methods: {
    load() {},
    // 点击菜单激活
    toPath(path) {
      // let str = this.$route.path // 浏览器地址的访问路径
      // console.log(path === str); // path ：代表点击菜单的路径
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
      // if (str === path) {
      //   return this.$message.info('当前路径重复，请选择其他选项')
      // }
    },
    // 返回按钮
    back() {
      this.$router.back()
    },
    // 前进按钮
    forward() {
      this.$router.forward()
    },
    // switch 开关
    changeValue(data) {
      this.$bus.$emit('getValue1', data)
    },
    changeValue2(data) {
      this.$bus.$emit('getValue2', data)
    },
    // 搜索回调 -- change 仅在输入框失去焦点或用户按下回车时触发
    async handSearch(value) {
      if (value) {
        this.$refs.input.blur()
        // this.value = ''
        this.changeIndex = false
        this.$router.push({ name: 'Search', params: { word: value } })
        window.sessionStorage.setItem('keyword', value)
      }
    },
    // input 在 Input 值改变时触发
    searchText(value) {
      this.changeIndex = true
      if (value) {
        const test = async () => {
          const { data: res } = await searchSuggest(value)
          this.suggestData = res.result
        }
        debounce(test)
      } else {
        this.changeIndex = false
      }
    },
    // 仅当获取焦点时触发
    async handFocus(value) {
      if (value) {
        this.changeIndex = true
        const { data: res } = await searchSuggest(value)
        this.suggestData = res.result
        // console.log(this.suggestData)
      }
    },
    // 失去焦点
    handBlur() {
      this.changeIndex = false
    }
  },
  watch: {
    '$route.path': function () {
      // if (!window.sessionStorage.getItem('loginData')) {
      //   this.$message.info('登录后效果更佳哦！')
      // }
      // console.log(111);
      const str = new RegExp('[\\d]{3,}', 'gm')
      const res = this.$route.path.match(str)
      if (res == null) {
        window.sessionStorage.setItem('activePath', this.$route.path)
        this.activePath = window.sessionStorage.getItem('activePath')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-header {
  // position: fixed;
  // top: 0;
  // width: 100%;
  // min-width: 1200px;
  // overflow: hidden;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e9ecf0;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid pink;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0 5px;
      &:nth-child(3) {
        width: 250px;
        margin-left: 20px;
      }
    }

    img {
      width: 30px;
      height: 30px;
      margin-top: 25px;
    }
    span {
      width: 240px;
      font-size: 24px;
      font-weight: bold;
      background-image: linear-gradient(to right, orange, pink);
      background-clip: text;
      color: transparent;
    }
  }
  ol {
    display: flex;
    align-items: center;
    li {
      margin: 0 8px;
    }
    .li5 {
      i {
        font-size: 26px;
        margin-left: 10px;
      }
      a {
        &:hover {
          color: rgb(255, 136, 0);
        }
      }
    }
    .span {
      cursor: pointer;
      margin: 0 5px 0 10px;
    }
    .cz {
      border: 1px solid #aaa;
      padding: 9px;
      font-size: 12px;
      color: #222;
      border-radius: 20px;
      &:hover {
        cursor: pointer;
        border-color: #222;
        color: #000;
      }
    }
  }
  .el-button {
    font-size: 10px;
    padding: 8px;
  }
  .searchBox {
    display: none;
    position: absolute;
    z-index: 999;
    top: 60px;
    left: 200px;
    width: 380px;
    background-color: #fff;
    border: 1px solid #bebebe;
    box-shadow: 0 4px 7px #555;
    border-radius: 5px;
    > div {
      display: flex;
    }
    .bf {
      width: 100px;
      font-size: 14px;
    }
    .br {
      flex: 1;
      text-align: left;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 5px 0;
      width: 280px;
    }
    a {
      display: block;
      height: 26px;
      line-height: 26px;
      padding-left: 20px;
      color: rgb(70, 70, 70);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: #ddd;
      }
    }
    span {
      color: rgb(95, 95, 95);
      font-size: 13px;
      font-weight: normal;
    }
    .box1 {
      width: 100%;
      .br {
        padding: 8px 0;
        .brItem {
          height: 26px;
        }
      }
    }
    .box2 {
      width: 100%;
      // height: 40px;
      background-color: #eee;
    }
    .box3 {
      width: 100%;
      // height: 75px;
    }
    .box4 {
      width: 100%;
      // height: 75px;
      background-color: #eee;
      .br {
        border-bottom: none;
      }
    }
  }
}

.el-aside {
  overflow: hidden;
  color: #333;
  border-right: solid 1px #e6e6e6;
  transition: all 0.3s;
}

.el-main {
  overflow: auto;
  color: #333;
  text-align: center;
  padding: 5px 20px;
}
@media only screen and (max-width: 499px) {
  .el-header {
    padding: 0;
    justify-content: space-evenly;
    ul {
      li {
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          display: none;
        }
      }
    }
    ol {
      li {
        display: none;
        &:nth-child(3) {
          display: block;
        }
        &:nth-child(4) {
          display: block;
        }
      }
    }
  }
  .el-aside {
    width: 40px !important;
    .el-menu{
      .el-menu-item{
        span{
          display: none;
        }
        i{
          margin: 0;
          margin-left: -13px;
        }
      }
    }
  }
  .el-main{
    padding-left: 0px;
  }
}
@media only screen and (min-width: 500px) and (max-width: 870px) {
  .el-header {
    justify-content: space-evenly;
    ul {
      li {
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          display: none;
        }
      }
    }
    ol {
      li {
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          display: none;
        }
      }
    }
  }
  .el-aside {
    display: none;
  }
}
@media only screen and (min-width: 871px) and (max-width: 1250px) {
  .el-header {
    justify-content: space-evenly;
    ul {
      li {
        &:nth-child(2) {
          display: none;
        }
      }
    }
    ol {
      li {
        // &:nth-child(1) {
        //   display: none;
        // }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          display: none;
        }
      }
    }
  }
  // .el-aside {
  // display: none;
  // }
}
</style>
