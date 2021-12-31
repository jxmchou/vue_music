<template>
  <div>
    <el-card>
      <div class="bigBox">
        <!-- 歌手页面左侧 -->
        <div class="leftBox">
          <!-- 头部信息 -->
          <div class="titleName">
            <img v-lazy="artistDetailData.cover" alt="" />
            <div class="titleSpan">
              <div>
                <span class="span1">歌手</span>
                <span class="span2">{{ artistDetailData.name }}</span>
              </div>
              <div class="span" @click="handSpan">
                <div title="点击收藏" v-show="spanTest == true">
                  <i class="el-icon-folder-add"></i> 收藏
                </div>
                <div title="点击取消收藏" v-show="spanTest == false">
                  <i class="el-icon-check"></i> 已收藏
                </div>
                <!-- <div>取消收藏</div> -->
              </div>
            </div>
          </div>
          <!-- tags标签区域 -->
          <template>
            <el-tabs
              type="border-card"
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane label="热门作品" name="one">
                <!-- <el-button-group>
                    <el-button type="primary" size="medium "><i class="el-icon-video-play"></i> <span>播放</span></el-button>
                    <el-button type="primary" size="medium " icon="el-icon-plus"></el-button>
                  </el-button-group> -->
                <div class="oneBox">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tr v-for="(item, index) in hotSongData" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <i
                          class="el-icon-video-play"
                          :title="`播放${item.name}}`"
                          @click="handMusic(item)"
                        ></i>
                      </td>
                      <td>
                        <span @click="toMusicDetail(item.id)">{{ item.name }}</span>
                      </td>
                      <td>
                        <span>{{ item.dt | formatSong }}</span>
                      </td>
                      <td>{{ item.al.name }}</td>
                    </tr>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="所有专辑" name="two">
                <div class="twoBox">
                  <div class="boxItem" v-for="item in albumData" :key="item.id">
                    <img
                      v-lazy="item.picUrl"
                      alt=""
                      @click="toAlbumDetail(item.id)"
                    />
                    <span class="span1">{{ item.name }}</span>
                    <span class="span2">{{
                      item.publishTime | dateFormat1
                    }}</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关MV" name="three">
                <div class="threeBox">
                  <div class="boxItem" v-for="item in mvData" :key="item.id">
                    <img
                      v-lazy="item.imgurl"
                      alt=""
                      @click="toMvDetail(item.id)"
                    />
                    <span class="span1">{{ item.name }}</span>
                    <span class="span2">{{ item.publishTime }}</span>
                    <span
                      class="el-icon-video-play"
                      @click="toMvDetail(item.id)"
                    ></span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="艺人介绍" name="four">
                <div class="fourBox">
                  <h4><i>&nbsp;</i> {{ artistDetailData.name }}的简介</h4>
                  <p v-html="briefDesc"></p>
                  <div
                    class="boxItem"
                    v-for="(item, index) in introduction"
                    :key="index"
                  >
                    <h4>{{ item.ti }}</h4>
                    <p style="white-space: pre-wrap">{{ item.txt }}</p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <!-- 歌手界面右侧 -->
        <div class="rightBox">
          <h3>相似歌手</h3>
          <div class="artistSimi">
            <div class="simiBox" v-for="item in similarData" :key="item.id">
              <img
                v-lazy="item.picUrl"
                alt=""
                @click="toArtistDetail(item.id)"
              />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  artistSimilar,
  artistHotSong,
  artistAlbum,
  artistMv,
  artistDesc,
  artistDetail,
  artistSub
} from '@/common/artistAPI'
export default {
  name: 'ArtistDetail',
  data() {
    return {
      artistId: 0, // 歌手id
      artistDetailData: {}, // 歌手信息
      similarData: [], // 相似歌手数据
      activeName: 'one', // tags默认激活状态
      hotSongData: [], // 热门歌曲数据
      albumData: [], // 歌手专辑数据
      mvData: [], // mv视频数据
      introduction: [], // 歌手重要事迹
      briefDesc: '', // 歌手简介
      spanTest: true, // 控制收藏按钮
      sub: 1 // 收藏回调参数
    }
  },
  mounted() {
    this.artistId = this.$route.params.id
    this.getArtistDetail()
    this.getArtistSimilar()
    this.getArtistHotSong()
    // this.getArtistAlbum()
    // this.getArtistMv()
    // this.getArtistDesc()
  },
  methods: {
    // 获取歌手信息
    async getArtistDetail() {
      const { data: res } = await artistDetail(this.artistId)
      this.artistDetailData = res.data.artist
    },
    // 获取相似歌手的回调
    async getArtistSimilar() {
      const { data: res } = await artistSimilar(this.artistId)
      console.log(res);
      this.similarData = res.artists
    },
    // 获取歌手热门50首歌曲
    async getArtistHotSong() {
      const { data: res } = await artistHotSong(this.artistId)
      this.hotSongData = res.songs
    },
    // 获取歌手热门专辑12首
    async getArtistAlbum() {
      const { data: res } = await artistAlbum(this.artistId)
      this.albumData = res.hotAlbums
    },
    // 获取歌手mv视频12首
    async getArtistMv() {
      const { data: res } = await artistMv(this.artistId)
      this.mvData = res.mvs
    },
    // 点击个人介绍回调
    async getArtistDesc() {
      const { data: res } = await artistDesc(this.artistId)
      const str = new RegExp('\n', 'gm')
      const result = res.briefDesc.replace(str, '<br />')
      this.briefDesc = result
      this.introduction = res.introduction
    },
    // 点击相似歌手跳转对应页面
    toArtistDetail(value) {
      this.$router.push({ name: 'ArtistDetail', params: { id: value } })
      this.artistId = value
      this.getArtistDetail()
      this.getArtistSimilar()
      this.getArtistHotSong()
      // this.getArtistAlbum()
      // this.getArtistMv()
      // this.getArtistDesc()
    },
    // 点击tags标签回调
    handleClick() {
      const { activeName } = this
      if (activeName === 'two') {
        this.getArtistAlbum()
      }
      if (activeName === 'three') {
        this.getArtistMv()
      }
      if (activeName === 'four') {
        this.getArtistDesc()
      }
    },
    // 点击其他专辑跳转详情界面
    toAlbumDetail(value) {
      this.$router.push({ name: 'AlbumDetail', params: { id: value } })
    },
    // 点击跳转至mv视频播放页面
    toMvDetail(value) {
      // console.log(value);
      this.$router.push({ name: 'MvList', params: { id: value } })
    },
    // 点击收藏回调
    async handSpan() {
      this.spanTest = !this.spanTest
      if (this.spanTest == false) {
        this.$message.success('收藏成功')
      }
      /* if(this.sub==1){
        const {data:res} = await artistSub(this.artistId,this.sub)
        console.log(res);
        this.sub = 0
      }else{
        const {data:res} = await artistSub(this.artistId,this.sub)
        console.log(res);
        this.sub = 1
      } */
    },
    // 播放单曲
    handMusic(item) {
      console.log(item);
      this.$store.dispatch('getMusicData', item)
    },
    // 点击歌曲跳转歌曲详情界面
    toMusicDetail(value) {
      // console.log(value)
      this.$router.push({ name: 'MusicDetail', params: { id: value } })
    },
  }
}
</script>

<style lang="less" scoped>
.bigBox {
  display: flex;
  justify-content: space-between;

  .leftBox {
    border: 1px solid #ccc;
    width: 62%;
    border-radius: 5px;
    padding: 20px;

    .titleName {
      display: flex;
      img {
        // margin-top: 5px;
        width: 50%;
        height: 300px;
      }
      .titleSpan {
        margin-left: 50px;
        div {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          .span1 {
            border: 1px solid red;
            padding: 8px 20px;
            border-radius: 5px;
            margin-right: 20px;
            color: red;
          }
          .span2 {
            font-size: 22px;
            font-weight: 700;
          }
        }
        .span {
          width: 100px;
          background-color: #eee;
          margin-top: 20px;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
    .oneBox {
      table {
        tr {
          height: 40px;
          line-height: 40px;

          &:nth-child(2n + 1) {
            background-color: #eee;
          }
          td {
            text-align: center;
            &:nth-child(1) {
              width: 50px;
            }
            &:nth-child(2) {
              width: 50px;
              font-size: 22px;
              color: #aaa;
              cursor: pointer;
            }
            &:nth-child(4) {
              font-size: 16px;
              color: #aaa;
            }
          }
          &:hover {
            background-color: rgb(231, 231, 231);
          }
        }
      }
    }
    .twoBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .boxItem {
        // background-color: #bfa;
        width: 23%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 180px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 130px;
          cursor: pointer;
        }
        .span1 {
          font-size: 15px;
          /*1. 先强制一行内显示文本*/
          white-space: nowrap;
          /*2. 超出的部分隐藏*/
          overflow: hidden;
          /*3. 文字用省略号替代超出的部分*/
          text-overflow: ellipsis;
        }
        .span2 {
          font-size: 14px;
          color: #aaa;
        }
      }
    }
    .threeBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .boxItem {
        position: relative;
        width: 23%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 180px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 130px;
          cursor: pointer;
        }
        .span1 {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .span2 {
          font-size: 14px;
          color: #aaa;
        }
        .el-icon-video-play {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 40px;
          color: rgba(170, 170, 170, 0.6);
          cursor: pointer;
          &:hover {
            color: rgb(199, 199, 199);
          }
        }
      }
    }
    .fourBox {
      text-align: left;
      h4 {
        i {
          width: 3px;
          height: 14px;
          margin-right: 7px;
          background: #c10d0c;
        }
      }
      p {
        font-size: 14px;
        line-height: 1.7;
        text-indent: 2em;
        color: rgb(83, 83, 83);
      }
      .boxItem {
        p {
          text-indent: 0;
        }
      }
    }
  }
  .rightBox {
    width: 33%;
    border: 1px solid #ccc;
    border-radius: 5px;
    .artistSimi {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .simiBox {
        width: 22%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 110px;
        margin-bottom: 20px;
        img {
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
