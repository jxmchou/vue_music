<template>
  <div>
    <el-card>
      <div class="bigBox">
        <!-- 左侧主体部分 -->
        <div class="leftBox">
          <!-- 左侧头部描述区域 -->
          <div class="leftBoxHeader">
            <div class="div">
              <img v-lazy="detailData.coverImgUrl" alt="" />
            </div>
            <div class="boxHeaderSpan">
              <div class="title">
                <span class="sp1">歌单</span>
                <span class="sp2">{{ detailData.name }}</span>
              </div>
              <div class="user">
                <img v-lazy="detailData.creator.avatarUrl" alt="" />
                <span class="sp1">{{ detailData.creator.nickname }}</span>
                <img
                  v-if="detailData.creator.avatarDetail"
                  class="img"
                  :src="detailData.creator.avatarDetail.identityIconUrl"
                  alt=""
                />
                <span class="sp2"
                  >{{ detailData.createTime | dateFormat2 }} 创建</span
                >
                <span class="sp2">播放：{{ detailData.playCount }}次</span>
              </div>
              <div class="btns">
                <div class="btn1">
                  <span class="sp1" @click="handMusics"
                    ><i class="el-icon-video-play"></i>播放</span
                  >
                  <span class="sp2"><i class="el-icon-plus"></i></span>
                </div>
                <div class="btn2">
                  <span
                    ><i class="el-icon-folder-add"></i> ({{
                      detailData.subscribedCount
                    }})</span
                  >
                </div>
                <div class="btn3">
                  <span
                    ><i class="el-icon-share"></i> ({{
                      detailData.shareCount
                    }})</span
                  >
                </div>
                <div class="btn4">
                  <span
                    ><i class="el-icon-s-comment"></i>({{
                      detailData.commentCount
                    }})</span
                  >
                </div>
              </div>
              <div class="tags">
                <span class="span1">标签: </span>
                <span v-for="(item, index) in detailData.tags">{{ item }}</span>
              </div>
              <div class="description">
                <el-collapse accordion>
                  <el-collapse-item title="歌单简介">
                    <p v-html="detailData.description"></p>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <!-- 左侧主体歌曲/评论区域 -->
          <div class="leftBoxMain">
            <!-- tags标签区域 -->
            <template>
              <el-tabs type="border-card" v-model="activeName">
                <!-- 歌曲区域 -->
                <el-tab-pane
                  :label="`歌曲列表（${detailData.trackCount}）`"
                  name="one"
                >
                  <!-- 歌曲表格区域 -->
                  <el-table :data="songsData" border stripe>
                    <el-table-column
                      type="index"
                      align="center"
                      label="#"
                    ></el-table-column>
                    <el-table-column
                      label="歌曲图片"
                      prop="al.picUrl"
                      align="center"
                    >
                      <template v-slot="item">
                        <img
                          v-lazy="item.row.al.picUrl"
                          alt=""
                          width="80px"
                          height="50px"
                          style="cursor: pointer"
                          @click="handMusic(item.row)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column label="歌曲标题" prop="name">
                      <template v-slot="item">
                        <span
                          style="cursor: pointer"
                          :title="item.row.name"
                          @click="toMusicDetail(item.row.id)"
                          >{{ item.row.name }}</span
                        >
                      </template>
                    </el-table-column>
                    <el-table-column label="时长" prop="dt">
                      <template v-slot="item">
                        {{ item.row.dt | formatSong }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="歌手名称"
                      prop="ar[0].name"
                    ></el-table-column>
                    <el-table-column
                      label="专辑"
                      prop="al.name"
                    ></el-table-column>
                  </el-table>
                </el-tab-pane>
                <!-- 评论区 -->
                <el-tab-pane :label="`歌曲评论（${total}）`" name="two">
                  <Comment :Id="songId" :type="2" />
                  <div class="hotComment">
                    <h4>精彩评论</h4>
                    <!-- 循环精彩评论 -->
                    <div
                      class="comment"
                      v-for="(item, index) in hotCommentData"
                      :key="index"
                    >
                      <img v-lazy="item.user.avatarUrl" alt="" />
                      <div class="commentSpan">
                        <span class="span"
                          >{{ item.user.nickname }} ：<span class="span1">{{
                            item.content
                          }}</span></span
                        >
                        <div
                          class="beReplied"
                          v-if="item.beReplied.length !== 0"
                        >
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
                      v-for="item in songCommentData.comments"
                      :key="item.commentId"
                    >
                      <img v-lazy="item.user.avatarUrl" alt="" />
                      <div class="commentSpan">
                        <span class="span"
                          >{{ item.user.nickname }} ：<span class="span1">{{
                            item.content
                          }}</span></span
                        >
                        <div
                          class="beReplied"
                          v-if="item.beReplied.length !== 0"
                        >
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
                  >
                  </el-pagination>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
        <!-- 歌单右侧部分 -->
        <div class="rightBox">
          <!-- 歌单收藏者区域 -->
          <h4>喜欢这个歌单的人（{{ subTotal }}）</h4>
          <div class="likeMan">
            <div v-for="item in subscribersData" :key="item.userId">
              <img v-lazy="item.avatarUrl" alt="" :title="item.nickname" />
            </div>
          </div>
          <!-- 相似歌单区域 -->
          <h4>相似推荐歌单</h4>
          <div class="hotDetail">
            <div class="hotBox" v-for="item in songRelatedData" :key="item.id">
              <img
                v-lazy="item.coverImgUrl"
                :title="item.name"
                alt=""
                @click="toSongDetail(item.id)"
              />
              <div class="boxSpan">
                <span>{{ item.name }}</span>
                <span>by {{ item.creator.nickname }}</span>
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
  SongRelated,
  subscribers,
  playlistDetail,
  songTracks,
  songComment
} from '@/common/playlistAPI'
import Comment from '@/components/Comment'
export default {
  name: 'SongDetail',
  data() {
    return {
      songId: 0, // 当前歌单id
      songRelatedData: [], // 歌单推荐数据
      subscribersData: [], // 歌单收藏的人数据
      subTotal: 0, // 收藏人数
      // 歌单信息
      detailData: {
        description: '',
        creator: {
          avatarDetail: { identityIconUrl: '' }
        },
        trackCount: 300,
        commentCount: 500
      },
      activeName: 'one', // tags标签默认激活
      songsData: [], // 歌单歌曲数据
      songCommentData: {}, // 歌单评论
      total: 20,
      offset: 1,
      limit: 20,
      hotCommentData: [], // 精彩评论
      musicData: {
        id: 0,
        name: '',
        artist: '',
        cover: '',
        url: '',
        lrc: ''
      } // 音乐三部曲 可用/url/歌词
    }
  },
  components: { Comment },
  mounted() {
    this.songId = this.$route.params.id
    this.getPlaylistDetail()
    this.getSubscribers()
    this.getSongRelated()
    this.getSongTracks()
    this.getHotComment()
    this.getSongComment()
    this.getOpen()
  },
  methods: {
    // 获取歌单详情
    async getPlaylistDetail() {
      const { data: res } = await playlistDetail(this.songId)
      this.detailData = res.playlist
      const str = new RegExp('\n', 'gm')
      const result = res.playlist.description.replace(str, '<br />')
      this.detailData.description = result
    },
    // 获取歌单收藏的人
    async getSubscribers() {
      const { data: res } = await subscribers(this.songId)
      this.subscribersData = res.subscribers
      this.subTotal = res.total
    },
    // 获取歌单推荐
    async getSongRelated() {
      const { data: res } = await SongRelated(this.songId)
      this.songRelatedData = res.playlists
    },
    // 获取歌单所有歌曲
    async getSongTracks() {
      const { data: res } = await songTracks(this.songId)
      this.songsData = res.songs
    },
    // 获取精彩评论
    async getHotComment() {
      const { songId, limit } = this
      const { data: res } = await songComment(songId, 0, limit)
      this.hotCommentData = res.hotComments
    },
    // 获取歌单评论
    async getSongComment() {
      const { songId, offset, limit } = this
      let result = (offset - 1) * limit
      const { data: res } = await songComment(songId, result, limit)
      this.songCommentData = res
      this.total = res.total
      // console.log(this.songCommentData.hotComments[0].beReplied.length);
    },
    // 点击相似推荐歌单跳转详情歌单界面
    toSongDetail(value) {
      this.$router.push({ name: 'SongDetail', params: { id: value } })
      this.songId = value
      this.getPlaylistDetail()
      this.getSubscribers()
      this.getSongRelated()
      this.getSongTracks()
      this.getSongComment()
      this.getOpen()
    },
    // 点击歌曲跳转歌曲详情界面
    toMusicDetail(value) {
      // console.log(value)
      this.$router.push({ name: 'MusicDetail', params: { id: value } })
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getSongComment()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getSongComment()
    },
    // 页面加载显示内容
    getOpen() {
      this.$notify({
        title: '提示',
        message:
          '单击音乐图片可实现跳转哦 ! ! 由于长度限制，默认获取歌曲最多50首',
        offset: 100,
        type: 'success'
      })
    },
    // 播放全部歌曲
    handMusics() {
      this.songsData.forEach((item) => {
        this.$store.dispatch('getMusicData', item)
      })
    },
    // 播放单曲
    handMusic(item) {
      this.$store.dispatch('getMusicData', item)
    }
  }
}
</script>

<style lang="less" scoped>
.bigBox {
  display: flex;
  justify-content: space-between;
  min-height: 600px;

  .leftBox {
    width: 62%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .leftBoxHeader {
      display: flex;
      // background-color: #bfa;
      .div {
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
      }
      .boxHeaderSpan {
        text-align: left;
        // min-width: 450px;
        min-height: 250px;
        // background-color: pink;
        flex: 1;
        > div {
          margin-bottom: 10px;
        }

        .title {
          width: 100%;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .sp1 {
            padding: 6px 14px 7px;
            margin-right: 20px;
            // border: 1px solid rgb(255, 38, 38);
            border-radius: 5px;
            background-color: rgb(255, 127, 127);
            color: #fff;
          }
          .sp2 {
            font-size: 18px;
          }
        }
        .user {
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            margin-right: 20px;
          }
          .sp1 {
            color: #0c73c2;
            font-size: 14px;
          }
          .img {
            width: 12px;
            height: 12px;
            margin: 0 0 0 2px;
          }
          .sp2 {
            color: #999;
            font-size: 14px;
            margin-left: 20px;
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
        .tags {
          span {
            border: 1px #ccc solid;
            border-radius: 10px;
            padding: 3px 10px;
            margin-right: 10px;
            color: rgb(134, 134, 134);
          }
          .span1 {
            border: none;
            color: #000;
            padding-left: 0;
          }
        }
        .description {
          p {
            font-size: 14px;
            color: rgb(112, 112, 112);
          }
        }
      }
    }
    .leftBoxMain {
      margin-top: 10px;
      width: 100%;
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
    width: 33%;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 20px;
    h4 {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      text-align: left;
    }
    .likeMan {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      div {
        width: 17%;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 50px;
          cursor: pointer;
        }
      }
    }
    .hotDetail {
      display: flex;
      flex-direction: column;
      // align-items: center;
      .hotBox {
        display: flex;
        margin-bottom: 10px;
        img {
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        .boxSpan {
          margin-left: 20px;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          span {
            max-width: 250px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(2) {
              color: rgb(126, 126, 126);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
