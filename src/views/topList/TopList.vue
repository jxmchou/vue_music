<template>
  <div>
    <el-card>
      <div class="topHeader">云音乐特色榜</div>
      <!-- 云音乐特色榜歌单区域 -->
      <!-- 内容区域 -->
      <div class="songContainer">
        <div class="songItem" v-for="item in songList4" :key="item.id">
          <div class="list-head">
            <!-- 头部左侧 -->
            <div class="list-head-img">
              <img
                v-lazy="item.coverImgUrl"
                alt=""
                @click="toSongDetail(item.id)"
              />
              <span class="el-icon-caret-right">{{
                item.playCount | formatCount
              }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="list-head-text">
              <div>{{ item.name }}</div>
              <div>
                <img v-lazy="item.creator.avatarUrl" alt="" />
                {{ item.creator.nickname }}
              </div>
              <div>{{ item.description }}</div>
            </div>
          </div>
          <!-- 歌曲列表区域 -->
          <div class="list-container">
            <div
              class="musicItem"
              v-for="(music, index) in item.tracks"
              :key="index"
            >
              <span class="span1">{{ index + 1 }}</span>
              <img v-lazy="music.al.picUrl" alt="" />
              <div class="musicInfo">
                <div class="musicName">
                  {{ music.name }}
                  <span v-show="music.alia[0]">({{ music.alia[0] }})</span>
                </div>
                <div class="author">
                  {{ music.ar[0].name }} - {{ music.name }}
                </div>
              </div>
              <span class="el-icon-share"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="topHeader">全球媒体榜</div>
      <!-- 全球媒体榜歌单区域 -->
      <!-- 内容区域 -->
      <div class="songContainer">
        <div class="songItem" v-for="item in topSongLists" :key="item.id">
          <div class="list-head">
            <!-- 头部左侧 -->
            <div class="list-head-img">
              <img
                v-lazy="item.coverImgUrl"
                alt=""
                @click="toSongDetail(item.id)"
              />
              <span class="el-icon-caret-right">{{
                item.playCount | formatCount
              }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="list-head-text">
              <div>{{ item.name }}</div>
              <div>{{ item.description }}</div>
            </div>
          </div>
          <!-- 歌曲列表区域 -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { topList } from '@/common/playlistAPI'
import { mapState } from 'vuex'
export default {
  name: 'TopList',
  data() {
    return {
      // topSongList: [], // 存放所有歌单的前四个数据
      topSongLists: [] // 存放所有歌单的其他数据
    }
  },
  beforeMount() {
    this.$store.dispatch('getTopList')
  },
  mounted() {
    this.getLists()
  },
  computed: {
    ...mapState(['songList']),
    songList4() {
      return this.songList.slice(0, 4)
    }
  },
  methods: {
    // 封装后面歌单
    async getLists() {
      const { data: res } = await topList()
      this.topSongLists = res.list.slice(4)
    },
    // 点击跳转对应歌单详情界面
    toSongDetail(value) {
      this.$router.push({ name: 'SongDetail', params: { id: value } })
    }
  }
}
</script>

<style lang="less" scoped>
.topHeader {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  text-align-last: left;
}
.songContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 500px;
  // 榜单内容区域样式
  .songItem {
    width: 48%;
    margin: 10px;
    box-sizing: border-box;
    background-color: rgb(241, 241, 241);
    /* 设置头部整体样式 */
    .list-head {
      height: 150px;
      display: flex;
      align-items: center;
      margin: 30px 25px;
      /* 头部左侧图片样式 */
      .list-head-img {
        width: 135px;
        height: 135px;
        border-radius: 30px;
        overflow: hidden;
        position: relative;
        margin-right: 30px;
        /* 图片 */
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        span {
          position: absolute;
          right: 10px;
          top: 10px;
          color: #fff;
          font-size: 16px;
        }
      }
      /* 设置头部右侧样式 */
      .list-head-text {
        width: 64%;
        flex: 1;
        align-items: center;
        color: #424242;
        div {
          &:nth-child(1) {
            color: #000;
            font-size: 17px;
          }
          &:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            font-size: 12px;
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin-right: 14px;
            }
          }
          &:nth-child(3) {
            line-height: 16px;
            font-size: 12px;
            color: #8a8a8a;
            width: 300px;
            padding-left: 30px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
            -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
            -webkit-line-clamp: 3; //设置显示几行
          }
        }
      }
    }
    // 设置每首歌曲样式
    .list-container {
      .musicItem {
        height: 45px;
        display: flex;
        align-items: center;
        position: relative;
        background-color: #fff;
        padding: 0 5px;
        margin: 0 5px 10px;
        .span1 {
          width: 40px;
          text-align: center;
          margin-right: 10px;
          font-size: 20px;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-video-play {
          width: 30px;
          height: 30px;
          font-size: 28px;
          color: #bbb;
        }
        .musicInfo {
          max-width: 350px;
          display: flex;
          flex-direction: column;
          margin-left: 30px;
          .musicName {
            display: flex;
            text-align: left;
            font-size: 14px;
            max-width: 350px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
              color: #ccc;
              max-width: 250px;
              margin-left: 15px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .author {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #aaa;
            max-width: 550px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .el-icon-share {
          position: absolute;
          right: 0px;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #ccc;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
