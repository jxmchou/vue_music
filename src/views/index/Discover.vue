<template>
  <el-card>
    <!-- 轮播图/走马灯区域 -->
    <el-carousel :interval="5000" trigger="click" height="250px" type="card">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img v-lazy="item.imageUrl" alt="" style="height: 100%; width: 100%" />
      </el-carousel-item>
    </el-carousel>

    <!-- 热门推荐区域 -->
    <div class="hotRecommend">
      <div class="hotHead">
        <div class="hotHeadLeft">
          <span class="el-icon-location">热门推荐</span>
        </div>
        <div class="more" @click="toPlaylist">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <div class="hotItem">
        <div class="hotList" v-for="item in personalizedList" :key="item.id">
          <div class="imgItem">
            <img v-lazy="item.picUrl" alt="" @click="toSongDetail(item.id)" />
            <div class="item">
              <i class="el-icon-headset"></i>
              <span>{{ item.playCount | formatCount }}</span>
              <i class="el-icon-video-play play"></i>
            </div>
          </div>
          <span class="hotSpan">
            <!-- <img src="@/assets/电台.png" alt=""> -->
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- 推荐新碟上架 -->
    <div class="newDisc">
      <div class="hotHead">
        <div class="hotHeadLeft">
          <span class="el-icon-location">新碟上架</span>
        </div>
        <div class="more" @click="toAlbum">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <!-- 每一首新碟内容 -->
      <div class="discBox">
        <div class="boxItem" v-for="(item, index) in topAlbumList" :key="index">
          <img v-lazy="item.picUrl" alt="" @click="toAlbumDetail(item.id)" />
          <span class="span1">{{ item.name }}</span>
          <span class="span2">{{ item.artists[0].name }}</span>
          <span class="el-icon-video-play"></span>
        </div>
      </div>
    </div>

    <!-- 最新MV区域 -->
    <div class="newMv">
      <!-- 复用新碟样式 -->
      <div class="hotHead">
        <div class="hotHeadLeft">
          <span class="el-icon-location">最新Mv</span>
        </div>
        <div class="more" @click="toMv">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <!-- 每个MV内容区 -->
      <div class="MvBox">
        <div class="boxItem" v-for="(item, index) in newMvList" :key="item.id">
          <img v-lazy="item.cover" alt="" @click="toMvList(item.id)" />
          <span class="span1">{{ item.name }}</span>
          <span class="span2">{{ item.artists[0].name }}</span>
          <span class="el-icon-video-play">{{
            item.playCount | formatCount
          }}</span>
        </div>
      </div>
    </div>

    <!-- 推荐榜单区域 -->
    <div class="songList">
      <div class="hotHead">
        <div class="hotHeadLeft">
          <span class="el-icon-location">热门榜单</span>
        </div>
        <div class="more" @click="toTopList">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="songContainer">
        <div class="songItem" v-for="item in songList3" :key="item.id">
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
              <img
                v-lazy="music.al.picUrl"
                alt=""
                title="播放"
                @click="toMusicDetail(music.id)"
              />
              <div class="musicInfo">
                <div class="musicName">
                  <span class="sp1">{{ music.name }}</span>
                  <span v-show="music.alia[0]">({{ music.alia[0] }})</span>
                </div>
                <div class="author">
                  <span>{{ music.ar[0].name }} - {{ music.name }}</span>
                </div>
              </div>
              <span class="el-icon-share"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </el-card>
</template>

<script>
import { banner, newAlbum, newMv } from '@/common/api'
import { personalized } from '@/common/playlistAPI'
import { mapState } from 'vuex'
export default {
  name: 'Discover',
  data() {
    return {
      scrollHeight: 0, // 页面滚动高度
      bannerList: [], // 轮播图数据
      personalizedList: {}, // 推荐歌单
      topAlbumList: [], // 每月的新碟歌曲
      newMvList: [], // 最新Mv视频
      topList: [] // 全有排行榜数据
      // songListIds: [], //保存榜单对应的id
      // songList: [] // 具体歌单的数据（飙升榜)
    }
  },
  beforeMount() {
    this.$store.dispatch('getTopList')
  },
  mounted() {
    this.getAPI()
  },
  computed: {
    ...mapState(['songList']),
    songList3() {
      return this.songList.slice(0, 3)
    }
  },
  methods: {
    getAPI() {
      this.getBanner()
      this.getPersonalized()
      this.getTopAlbum()
      this.getNewMv()
    },
    // 获取轮播图回调
    async getBanner() {
      const { data: res } = await banner()
      if (res.code !== 200) {
        return this.$message.error('获取轮播图数据失败')
      }
      this.bannerList = res.banners
      // console.log(this.bannerList);
    },
    // 获取推荐歌单回调
    async getPersonalized() {
      const { data: res } = await personalized()
      // console.log(res);
      if (res.code !== 200) {
        return this.$message.error('获取推荐歌单数据失败')
      }
      this.personalizedList = res.result
    },
    // 获取新碟上架回调
    async getTopAlbum() {
      const { data: res } = await newAlbum()
      if (res.code !== 200) {
        this.$message.error('获取新碟歌单失败')
      }
      this.topAlbumList = res.albums.slice(0, 5)
    },
    // 获取最新MV视频
    async getNewMv() {
      const { data: res } = await newMv()
      if (res.code !== 200) {
        this.$message.error('获取最新MV视频失败')
      }
      this.newMvList = res.data.slice(0, 3)
    },
    // 获取所有榜单得到对应id
    /* async getTopList() {
      // 获取具体的歌单
      var index = 0
      while (index < 1) {
        const { data: res1 } = await playList(
          this.$store.state.songListId[index]
        )
        index++
        console.log(res1);
        res1.playlist.tracks.length = 3
        this.songList.push(res1.playlist)
      }
      // console.log(this.songList);
    }, */
    // 跳转至歌单页面
    toPlaylist() {
      this.$router.push('/home/playlist')
    },
    // 点击跳转对应歌单详情界面
    toSongDetail(value) {
      this.$router.push({ name: 'SongDetail', params: { id: value } })
    },
    // 跳转至新碟热歌页面
    toAlbum() {
      this.$router.push('/home/album')
    },
    // 点击跳转专辑详情界面
    toAlbumDetail(value) {
      this.$router.push({ name: 'AlbumDetail', params: { id: value } })
    },
    // 点击跳转mv页面
    toMv() {
      this.$router.push('/home/mv')
    },
    // 跳转至详细的播放界面
    toMvList(value) {
      this.$router.push({ name: 'MvList', params: { id: value } })
    },
    toTopList() {
      this.$router.push('/home/toplist')
    },
    // 点击歌曲跳转歌曲详情界面
    toMusicDetail(value) {
      // console.log(value)
      this.$router.push({ name: 'MusicDetail', params: { id: value } })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
}

.el-carousel {
  margin: 20px 0 40px;
  img {
    border-radius: 20px;
  }
}
.hotHead {
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-right: 10%;
  border-bottom: 2px solid pink;
  margin-bottom: 10px;
  .hotHeadLeft {
    display: flex;
    align-items: center;
    span {
      color: red;
      font-size: 22px;
      margin-right: 50px;
      cursor: pointer;
    }
  }
  .more {
    color: pink;
    cursor: pointer;
  }
}
.hotRecommend {
  width: 100%;

  .hotItem {
    // padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .hotList {
      width: 22%;
      height: 330px;
      .imgItem {
        position: relative;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .item {
          position: absolute;
          bottom: 4px;
          width: 100%;
          line-height: 26px;
          background-color: rgba(51, 51, 51, 0.8);
          color: rgb(204, 204, 204);
          text-align: left;
          padding: 0 15px;
          box-sizing: border-box;
          span {
            padding: 0 0px 0 10px;
          }
          .el-icon-video-play {
            font-size: 22px;
            position: absolute;
            top: 2px;
            right: 10px;
          }
        }
      }
      .hotSpan {
        height: 70px;
        line-height: 1.5;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
        -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 2; //设置显示几行
        img {
          width: 40px;
          height: 20px;
          vertical-align: bottom;
        }
      }
    }
  }
}

.newDisc {
  .discBox {
    // margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .boxItem {
      position: relative;
      width: 18%;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      height: 200px;
      background-color: rgb(243, 243, 243);
      margin-bottom: 20px;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 150px;
        cursor: pointer;
      }
      span {
        width: 95%;
        text-align: left;
        padding: 5px 0 0 5px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .span2 {
        font-size: 13px;
        padding: 0 0 0 5px;
        color: #aaa;
      }
      .el-icon-video-play {
        position: absolute;
        bottom: 55px;
        right: 8px;
        font-size: 22px;
        color: #ccc;
      }
    }
  }
}

.newMv {
  .MvBox {
    // margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .boxItem {
      position: relative;
      width: 32%;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      height: 250px;
      background-color: rgb(243, 243, 243);
      margin-bottom: 20px;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 200px;
        cursor: pointer;
      }
      span {
        padding: 5px 0 0 5px;
        font-size: 15px;
      }
      .span2 {
        font-size: 13px;
        padding: 0 0 0 5px;
        color: #aaa;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-icon-video-play {
        position: absolute;
        bottom: 60px;
        right: 10px;
        font-size: 22px;
        color: #ccc;
      }
    }
  }
}

.songList {
  // margin: 20px 0;

  .songContainer {
    display: flex;
    justify-content: space-between;
    // 榜单内容区域样式
    .songItem {
      width: 32%;
      box-sizing: border-box;
      background-color: rgb(241, 241, 241);
      /* 设置头部整体样式 */
      .list-head {
        display: flex;
        align-items: center;
        margin: 30px 15px;
        /* 头部左侧图片样式 */
        .list-head-img {
          width: 120px;
          height: 120px;
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
              width: 170px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
              -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
              -webkit-line-clamp: 2; //设置显示几行
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
            width: 30px;
            text-align: center;
            margin-right: 10px;
            font-size: 20px;
          }
          img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
          }
          .musicInfo {
            width: 60%;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .musicName {
              display: flex;
              .sp1 {
                color: #000;
                margin-left: 0;
                font-size: 14px;
              }
              span {
                color: #ccc;
                max-width: 80px;
                margin-left: 5px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .author {
              max-width: 80%;
              text-align: left;
              span {
                display: block;
                font-size: 12px;
                color: #aaa;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .el-icon-share {
            position: absolute;
            right: 15px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: right;
            color: #ccc;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 499px) {
  .el-carousel {
    display: none;
  }
  .hotHead {
    margin-bottom: 10px;
    justify-content: space-between;
    span {
      font-size: 16px !important;
    }
    .more {
      font-size: 14px;
    }
  }
  .hotRecommend {
    .hotItem {
      .hotList {
        width: 38vw;
        height: 55vw;
        .hotSpan {
          height: 13vw;
        }
      }
    }
  }
  .newDisc {
    .discBox {
      justify-content: space-around;
      .boxItem {
        width: 38vw;
        height: 55vw;
      }
    }
  }
  .newMv {
    .MvBox {
      justify-content: space-evenly;
      .boxItem {
        width: 70vw;
      }
    }
  }
  .songList {
    .songContainer {
      flex-direction: column;
      .songItem {
        width: 100%;
        .list-head {
          .list-head-img {
            margin-right: 0;
            height: 27vw;
            border-radius: 10px;
          }
        }
        .musicInfo {
          width: 52vw;
        }
      }
    }
  }
}
</style>
