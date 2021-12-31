<template>
  <div>
    <el-card>
      <div class="musicBox">
        <!-- 左侧 -->
        <div class="leftBox">
          <!-- 左侧头部描述区域 -->
          <div class="leftBoxHeader" v-if="musicDetailData.length">
            <!-- 专辑头像 -->
            <div class="disc">
              <img src="@/assets/disc.png" alt="" />
              <div class="div">
                <img v-lazy="musicDetailData[0].al.picUrl" alt="" />
              </div>
            </div>
            <!-- 头部专辑描述 -->
            <div class="boxHeaderSpan">
              <div class="title">
                <span class="sp1">单曲</span>
                <span class="sp2">{{ musicDetailData[0].name }}</span>
                <p class="p1">
                  <b>歌手：</b>
                  <span>
                    <a
                      :href="`#/home/artistdetail/${musicDetailData[0].ar[0].id}`"
                      :title="`${musicDetailData[0].ar[0].name}的音乐`"
                    >
                      {{ musicDetailData[0].ar[0].name }}
                    </a>
                  </span>
                </p>
                <!-- <p>
                  <b>发行时间：</b>
                  {{ musicDetailData[0].publishTime | dateFormat2 }}
                </p> -->
                <p>
                  <b>所属专辑：</b>
                  <a :href="`#/home/albumdetail/${musicDetailData[0].al.id}`">{{
                    musicDetailData[0].al.name
                  }}</a>
                </p>
              </div>
              <div class="btns">
                <div class="btn1">
                  <span class="sp1" title="播放歌曲" @click="handMusic"
                    ><i class="el-icon-video-play"></i>播放</span
                  >
                  <span class="sp2" title="添加到播放列表" @click="handAddWait"
                    ><i class="el-icon-plus"></i
                  ></span>
                </div>
                <div class="btn2">
                  <span><i class="el-icon-folder-add"></i> 收藏</span>
                </div>
                <div class="btn3">
                  <span><i class="el-icon-share"></i> 分享</span>
                </div>
                <div class="btn4">
                  <span><i class="el-icon-s-comment"></i> ({{ total }})</span>
                </div>
              </div>
              <div
                :style="changeOpen ? 'max-height:300px' : 'height:100%'"
                class="description"
              >
                <p v-html="lyrics"></p>
              </div>
              <span v-show="changeOpen == true" class="span" @click="handOpen"
                >展开<i class="el-icon-arrow-down"></i
              ></span>
              <span v-show="changeOpen == false" class="span" @click="handOpen"
                >收起<i class="el-icon-arrow-up"></i
              ></span>
            </div>
          </div>
          <!-- 左侧主体歌曲/评论区域 -->
          <div class="leftBoxMain">
            <div class="titleComment">
              <span class="sp1">评论</span>
              <span class="subCount">共{{ total }}条评论</span>
            </div>
            <div class="commentBox">
              <!-- 引入评论框组件 -->
              <Comment :musicId="musicId" :type='0'/>
              <!-- 单曲评论 -->
              <div class="hotComment">
                <h4>精彩评论</h4>
                <!-- 循环精彩评论 -->
                <div
                  class="comment"
                  v-for="item in hotCommentData"
                  :key="item.commentId"
                >
                  <img v-lazy="item.user.avatarUrl" alt="" />
                  <div class="commentSpan">
                    <span class="span"
                      >{{ item.user.nickname }} ：<span class="span1">{{
                        item.content
                      }}</span></span
                    >
                    <div class="beReplied" v-if="item.beReplied.length !== 0">
                      <span class="sp1">
                        {{ item.beReplied[0].user.nickname }} ：<span
                          class="sp2"
                          >{{ item.beReplied[0].content }}</span
                        >
                      </span>
                    </div>
                    <span class="span2">{{ item.time | dateFormat2 }}</span>
                  </div>
                  <div class="icon">
                    <i class="el-icon-thumb"></i>
                    {{ item.likedCount }}
                  </div>
                </div>
                <h4>最新评论</h4>
                <!-- 循环最新评论 -->
                <div
                  class="comment"
                  v-for="item in musicCommentData"
                  :key="item.commentId"
                >
                  <img v-lazy="item.user.avatarUrl" alt="" />
                  <div class="commentSpan">
                    <span class="span"
                      >{{ item.user.nickname }} ：<span class="span1">{{
                        item.content
                      }}</span></span
                    >
                    <div class="beReplied" v-if="item.beReplied.length !== 0">
                      <span class="sp1">
                        {{ item.beReplied[0].user.nickname }} ：<span
                          class="sp2"
                          >{{ item.beReplied[0].content }}</span
                        >
                      </span>
                    </div>
                    <span class="span2">{{ item.time | dateFormat2 }}</span>
                  </div>
                  <div class="icon">
                    <i class="el-icon-thumb"></i>
                    {{ item.likedCount }}
                  </div>
                </div>
              </div>
              <!-- 分页器 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="offset"
                :page-sizes="[20, 40, 60]"
                :page-size="limit"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
                background
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="rightBox">
          <h4>相似歌曲</h4>
          <div
            class="musicList"
            v-for="item in musicSimilarData"
            :key="item.id"
          >
            <div class="lists">
              <img
                v-lazy="item.album.picUrl"
                alt=""
                @click="toMusicDetail(item.id)"
              />
              <div class="span">
                <span class="sp1">{{ item.name }}</span>
                <span class="sp2">
                  <a
                    :href="`#/home/artistdetail/${item.album.artists[0].id}`"
                    :title="`${item.album.artists[0].name}的音乐`"
                    >{{ item.album.artists[0].name }}</a
                  >
                  <a
                    v-if="item.album.artists[1]"
                    :href="`#/home/artistdetail/${item.album.artists[1].id}`"
                    :title="`${item.album.artists[1].name}的音乐`"
                  >
                    / {{ item.album.artists[1].name }}</a
                  >
                </span>
              </div>
              <div class="icon2">
                <i class="el-icon-video-play" @click="handMusic1(item)"></i>
                <i class="el-icon-plus" @click="handAddWait1(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  musicComment,
  musicSimilar,
  musicDetail,
  musicCheck,
  musicUrl,
  musicLyric
} from '@/common/playlistAPI'
import Comment from '@/components/Comment'
export default {
  name: 'MusicDetail',
  data() {
    return {
      musicId: 0, // 音乐id
      changeOpen: true, // 展开/折叠
      total: 20,
      offset: 1,
      limit: 20,
      lyrics: '',
      hotCommentData: [], // 精彩评论
      musicCommentData: [], // 专辑评论
      musicSimilarData: [], // 相似音乐
      musicDetailData: [], // 音乐信息
      musicData: {
        id: 0,
        name: '',
        artist: '',
        cover: '',
        url: '',
        lrc: ''
      }, // 音乐三部曲 可用/url/歌词
      musicWait: true,
      
    }
  },
  components:{Comment},
  created() {
    this.musicId = this.$route.params.id
    this.getMusicDetail()
    this.getHotComment()
    this.getMusicComment()
    this.getMusicSimilar()
  },
  mounted() {},
  methods: {
    // 获取音乐三部曲
    async getMusic() {
      try {
        const { data: res1 } = await musicCheck(this.musicId)
        // console.log(res1);
        if (res1.success == true) {
          const { data: res2 } = await musicUrl(this.musicId)
          this.musicData.url = res2.data[0].url
          this.musicData.id = res2.data[0].id
          // this.$store.commit('musicsData', this.musicData)
          // console.log(res1)
        }
      } catch (error) {
        this.$message.error('该歌曲无法通过白嫖方式播放')
      }
    },
    // 播放音乐
    handMusic() {
      // this.getMusic()
      this.$store.dispatch('getMusicData', this.musicDetailData[0])
    },
    // 添加至播放列表
    handAddWait() {
      // this.getMusic()
      this.$store.commit('musicWait', this.musicWait)
      this.$store.dispatch('getMusicData', this.musicDetailData[0])
    },
    // 播放音乐
    async handMusic1(item) {
      const { data: res } = await musicDetail(item.id)
      const result = res.songs[0]
      // console.log(result);
      // this.getMusic()
      this.$store.dispatch('getMusicData', result)
    },
    // 添加至播放列表
    async handAddWait1(item) {
      const { data: res } = await musicDetail(item.id)
      const result = res.songs[0]
      // this.getMusic()
      this.$store.commit('musicWait', this.musicWait)
      this.$store.dispatch('getMusicData', result)
    },
    // 获取歌曲信息
    async getMusicDetail() {
      const { data: res } = await musicDetail(this.musicId)
      this.musicDetailData = res.songs
      this.musicData.name = res.songs[0].name
      this.musicData.artist = res.songs[0].ar[0].name
      this.musicData.cover = res.songs[0].al.picUrl
      const { data: res2 } = await musicLyric(this.musicId)
      this.musicData.lrc = res2.lrc.lyric
      let re = /\s*\n*\[.*?\]\s*/g
      let re1 = /\n/g
      let result = res2.lrc.lyric.replace(re1, '<br />')
      this.lyrics = result.replace(re, '').trim()
    },
    // 获取精彩评论
    async getHotComment() {
      const { musicId, limit } = this
      const { data: res } = await musicComment(musicId, 0, limit)
      this.hotCommentData = res.hotComments
    },
    // 获取专辑最新评论
    async getMusicComment() {
      const { musicId, offset, limit } = this
      let result = (offset - 1) * limit
      const { data: res } = await musicComment(musicId, result, limit)
      this.musicCommentData = res.comments
      this.total = res.total
    },
    // 获取相似歌曲
    async getMusicSimilar() {
      const { data: res } = await musicSimilar(this.musicId)
      this.musicSimilarData = res.songs
    },
    // 跳转至音乐详情界面
    toMusicDetail(value) {
      this.$router.push({ name: 'MusicDetail', params: { id: value } })
      this.musicId = value
      this.getMusicDetail()
      this.getHotComment()
      this.getMusicComment()
      this.getMusicSimilar()
    },
    // 控制歌词展开
    handOpen() {
      this.changeOpen = !this.changeOpen
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getMusicComment()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getMusicComment()
    },
    
  }
}
</script>

<style lang="less" scoped>
.changeOpen {
  height: 100%;
}
.musicBox {
  display: flex;
  justify-content: space-between;
  min-height: 600px;
  .leftBox {
    width: 65%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .leftBoxHeader {
      display: flex;
      .disc {
        position: relative;
        min-width: 200px;
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
        padding: 5px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
        .div {
          position: absolute;
          top: 44px;
          left: 44px;
          width: 122px;
          height: 122px;
          img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
        }
      }
      .boxHeaderSpan {
        text-align: left;
        min-height: 250px;
        height: 100%;
        flex: 1;
        > div {
          margin-bottom: 10px;
        }
        .title {
          width: 100%;
          margin-bottom: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .sp1 {
            padding: 6px 14px 7px;
            margin-right: 20px;
            border-radius: 5px;
            background-color: rgb(255, 127, 127);
            color: #fff;
          }
          .sp2 {
            font-size: 22px;
          }
          p {
            font-size: 12px;
            color: #666;
            margin-bottom: 0;
            margin-top: 10px;
            a {
              color: #0c73c2;
              text-decoration: none;
            }
            span {
              color: #0c73c2;
            }
          }
          .p1 {
            margin-top: 18px;
            a {
              color: #0c73c2;
              text-decoration: none;
            }
          }
        }
        .btns {
          display: flex;

          > div {
            border: 1px solid #aaa;
            border-radius: 5px;
            // width: 70px;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            padding: 0 10px;
            cursor: pointer;
            &:hover {
              border-color: rgb(110, 109, 109);
            }
          }
          span {
            color: rgb(98, 98, 98);
            font-size: 15px;
            i {
              font-size: 19px;
              vertical-align: middle;
            }
          }
          .btn1 {
            .sp1 {
              padding: 5px 5px 5px 0;
              border-right: 1px solid #ccc;
              i {
                margin-right: 2px;
              }
            }
            .sp2 {
              padding-left: 5px;
            }
          }
        }
        .description {
          width: 100%;
          // height: 300px;
          overflow: hidden;
          padding-bottom: 20px;
          p {
            width: 500px;
            font-size: 13px;
            line-height: 1.8;
            color: rgb(112, 112, 112);
          }
        }
        .span {
          cursor: pointer;
          font-size: 14px;
          color: rgb(12, 115, 194);
          i {
            margin-left: 2px;
          }
        }
      }
    }
    .leftBoxMain {
      margin-top: 40px;
      width: 100%;
      .titleComment {
        text-align: left;
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        .sp1 {
          font-size: 20px;
          line-height: 28px;
        }
        .subCount {
          font-size: 14px;
          color: #666;
          margin: 9px 0 0 20px;
        }
      }
      .commentBox {
        margin-top: 20px;
        
      }
      .comment {
        border-top: 1px dotted rgb(204, 204, 204);
        display: flex;
        align-items: center;
        justify-content: space-between;
        // height: 120px;
        margin-bottom: 20px;
        padding: 10px 10px 0 10px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .commentSpan {
          display: flex;
          align-items: flex-start;
          flex: 1;
          margin: 0 20px;
          flex-direction: column;
          .span {
            font-size: 15px;
            color: royalblue;
            text-align: left;
            margin-bottom: 5px;
            .span1 {
              font-size: 14px;
              color: rgb(114, 114, 114);
            }
          }
          .beReplied {
            background-color: rgb(244, 244, 244);
            border: 1px solid rgb(222, 222, 222);
            padding: 8px 10px;
            line-height: 20px;
            margin: 10px 0;
            text-align: left;
            .sp1 {
              color: rgb(12, 115, 194);
              font-size: 14px;
            }
            .sp2 {
              color: rgb(102, 102, 102);
              font-size: 13px;
            }
          }
          .span2 {
            font-size: 15px;
            color: #999;
          }
        }
        .icon {
          color: rgb(214, 45, 45);
          i {
            cursor: pointer;
          }
        }
      }
      h4 {
        text-align: left;
      }
    }
  }
  .rightBox {
    box-sizing: border-box;
    width: 30%;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 20px;
    h4 {
      text-align: left;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
    .musicList {
      display: flex;
      flex-direction: column;
      .lists {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        img {
          width: 80px;
          height: 80px;
          cursor: pointer;
          margin-right: 5px;
        }
        .span {
          min-width: 160px;
          display: flex;
          flex-direction: column;
          span{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 160px;
            text-align: left;
          }
          .sp2 {
            color: #999;
            font-size: 14px;
            margin-top: 20px;
            a {
              color: rgb(78, 78, 78);
              text-decoration: none;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .icon2 {
          // margin-left: 20px;
          width: 80px;
          i {
            font-size: 30px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
