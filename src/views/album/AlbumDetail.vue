<template>
  <div>
    <el-card>
      <div class="albumBox">
        <!-- 左侧 -->
        <div class="leftBox">
          <!-- 左侧头部描述区域 -->
          <div class="leftBoxHeader">
            <!-- 专辑头像 -->
            <div class="div">
              <img v-lazy="albumData.album.blurPicUrl" alt="" />
            </div>
            <!-- 头部专辑描述 -->
            <div class="boxHeaderSpan" v-if="albumData.code">
              <div class="title">
                <span class="sp1">专辑</span>
                <span class="sp2">{{ albumData.album.name }}</span>
                <p class="p1">
                  <b>歌手：</b
                  ><span
                    ><a
                      :href="`#/home/artistdetail/${albumData.album.artist.id}`"
                      :title="`${albumData.album.artist.name}的专辑`"
                      >{{ albumData.album.artist.name }}</a
                    >
                    <a
                      v-if="albumData.album.artists[1]"
                      :href="`#/home/artistdetail/${albumData.album.artists[1].id}`"
                      :title="`${albumData.album.artists[1].name}的专辑`"
                    >
                      / {{ albumData.album.artists[1].name }}</a
                    ></span
                  >
                </p>
                <p><b>发行时间：</b> {{ albumData.album.publishTime }}</p>
                <p><b>发行公司：</b> {{ albumData.album.company }}</p>
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
                      dynamicData.subCount
                    }})</span
                  >
                </div>
                <div class="btn3">
                  <span
                    ><i class="el-icon-share"></i> ({{
                      dynamicData.shareCount
                    }})</span
                  >
                </div>
                <div class="btn4">
                  <span
                    ><i class="el-icon-s-comment"></i> ({{
                      dynamicData.commentCount
                    }})</span
                  >
                </div>
              </div>
              <div class="description">
                <el-collapse accordion>
                  <el-collapse-item title="歌单简介">
                    <p v-html="albumData.description"></p>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <!-- 左侧主体歌曲/评论区域 -->
          <div class="leftBoxMain">
            <!-- tags标签区域 -->
            <template>
              <el-tabs
                type="border-card"
                v-model="activeName"
                v-if="albumData.code"
              >
                <!-- 歌曲区域 -->
                <el-tab-pane
                  :label="`歌曲列表（${albumData.songs.length}）`"
                  name="one"
                >
                  <!-- 歌曲表格区域 -->
                  <el-table :data="albumData.songs" border stripe>
                    <el-table-column
                      type="index"
                      align="center"
                      label="#"
                    ></el-table-column>
                    <el-table-column
                      label="#"
                      prop="al.picUrl"
                      align="center"
                      width="50px"
                    >
                      <template v-slot="item">
                        <i
                          class="el-icon-video-play"
                          style="cursor: pointer; font-size: 20px"
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
                    <el-table-column label="时长" prop="dt" width="80px">
                      <template v-slot="item">
                        {{ item.row.dt | formatSong }}
                      </template>
                    </el-table-column>
                    <el-table-column label="歌手名称" prop="ar[0].name">
                      <template v-slot="item">
                        <a
                          :class="'change'"
                          :href="`#/home/artistdetail/${item.row.ar[0].id}`"
                          >{{ item.row.ar[0].name }}</a
                        >
                        <a
                          :class="'change'"
                          v-if="item.row.ar[1]"
                          :href="`#/home/artistdetail/${item.row.ar[1].id}`"
                        >
                          / {{ item.row.ar[1].name }}</a
                        >
                        <a
                          :class="'change'"
                          v-if="item.row.ar[2]"
                          :href="`#/home/artistdetail/${item.row.ar[2].id}`"
                        >
                          / {{ item.row.ar[2].name }}</a
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <!-- 评论区 -->
                <el-tab-pane :label="`歌曲评论（${total}）`" name="two">
                  <Comment :Id="albumId" :type="3" />
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
                      v-for="item in albumCommentData.comments"
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
                    background
                  >
                  </el-pagination>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="rightBox">
          <h4 v-if="albumData.code">
            <span>他的其他专辑</span>
            <a
              :href="`#/home/artistdetail/${albumData.album.artist.id}`"
              :title="`${albumData.album.artist.name}的全部专辑`"
              >全部 ></a
            >
          </h4>
          <div class="albumList">
            <div class="lists" v-for="item in artistAlbumData" :key="item.id">
              <img
                v-lazy="item.picUrl"
                alt=""
                @click="toAlbumDetail(item.id)"
              />
              <div class="span">
                <span class="sp1">{{ item.name }}</span>
                <span class="sp2">{{ item.publishTime | dateFormat2 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dynamic, album, albumComment } from '@/common/api'
import { artistAlbum } from '@/common/artistAPI'
import Comment from '@/components/Comment'
export default {
  name: 'AlbumDetail',
  data() {
    return {
      firstArtistId: 0, // 歌手id
      albumId: 0, // 专辑id
      dynamicData: {}, // 专辑评论/收藏
      // 专辑信息
      albumData: {
        album: { blurPicUrl: '', name: '', description: '', company: '' }
      },
      activeName: 'one',
      albumCommentData: {}, // 专辑评论
      total: 20,
      offset: 1,
      limit: 20,
      hotCommentData: [], // 精彩评论
      artistAlbumData: [] // 歌手其他专辑
    }
  },
  components:{Comment},
  created() {
    this.albumId = this.$route.params.id
    this.getDynamic()
    this.getAlbum()
    this.getAlbumComment()
    this.getHotComment()
    setTimeout(() => {
      this.getArtistAlbum()
    }, 500)
  },
  mounted() {
    // this.getOpen()
  },
  methods: {
    // 获取专辑动态信息/评论数等
    async getDynamic() {
      const { data: res } = await dynamic(this.albumId)
      this.dynamicData = res
    },
    // 获取专辑信息
    async getAlbum() {
      const { data: res } = await album(this.albumId)
      this.albumData = res
      const str = new RegExp('\n', 'gm')
      const result = res.album.description.replace(str, '<br />')
      this.albumData.description = result
      window.sessionStorage.setItem('firstArtistId', res.album.artist.id)
      // console.log(res.album.artist.id,this.firstArtistId);
    },
    // 获取精彩评论
    async getHotComment() {
      const { albumId, limit } = this
      const { data: res } = await albumComment(albumId, 0, limit)
      this.hotCommentData = res.hotComments
    },
    // 获取专辑评论
    async getAlbumComment() {
      const { albumId, offset, limit } = this
      let result = (offset - 1) * limit
      const { data: res } = await albumComment(albumId, result, limit)
      this.albumCommentData = res
      this.total = res.total
    },
    // 获取歌手其他专辑
    async getArtistAlbum() {
      const firstArtistId = window.sessionStorage.getItem('firstArtistId')
      if (firstArtistId) {
        const { data: res } = await artistAlbum(firstArtistId)
        console.log(res.hotAlbums)
        for (let i = 0; i < 5; i++) {
          let ran = Math.floor(Math.random() * res.hotAlbums.length)
          this.artistAlbumData.push(res.hotAlbums.splice(ran, 1)[0])
        }
        // console.log(res.hotAlbums.length);
      }
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getAlbumComment()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getAlbumComment()
    },
    // 点击其他专辑跳转详情界面
    toAlbumDetail(value) {
      this.artistAlbumData = []
      this.$router.push({ name: 'AlbumDetail', params: { id: value } })
      this.albumId = value
      this.getDynamic()
      this.getAlbum()
      this.getAlbumComment()
      this.getHotComment()
      this.getArtistAlbum()
    },
    // 点击歌曲跳转歌曲详情界面
    toMusicDetail(value) {
      this.$router.push({ name: 'MusicDetail', params: { id: value } })
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
    // 播放单曲
    handMusic(item) {
      this.$store.dispatch('getMusicData', item)
    },
    // 播放全部歌曲
    handMusics() {
      this.albumData.songs.forEach((item) => {
        this.$store.dispatch('getMusicData', item)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.albumBox {
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
        min-height: 250px;
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
            font-size: 20px;
          }
          p {
            font-size: 12px;
            color: #666;
            margin-bottom: 0;
            margin-top: 10px;
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
    width: 30%;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 20px;

    h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      a {
        color: rgb(56, 56, 56);
        text-decoration: none;
        font-size: 15px;
      }
    }
    .albumList {
      display: flex;
      flex-direction: column;
      .lists {
        display: flex;
        margin-bottom: 20px;
        img {
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        .span {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 20px;
          .sp2 {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
  }
}
.change {
  color: #000;
  text-decoration: none;
}
</style>
