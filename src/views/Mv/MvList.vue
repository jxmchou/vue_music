<template>
  <div>
    <el-card>
      <el-row :gutter="50">
        <!-- 左侧部分 -->
        <el-col :span="16" class="col1">
          <!-- 返回MV视频列表区 -->
          <a href="#/home/mv" title="返回MV视频列表区">
            <i class="el-icon-arrow-left"></i>
            <h3>MV总视频</h3></a
          >
          <!-- video视频区域 -->
          <div class="video">
            <video
              ref="video"
              controls
              :poster="mvListData.cover"
              height="400px"
            >
              <source src="" type="video/mp4" />
              <source src="" type="video/ogg" />
              您的浏览器太low了，不支持播放此视频
            </video>
          </div>
          <!-- 视频相关信息 -->
          <div class="boxSpan">
            <span>{{ mvListData.name }}</span>
            <div class="div1">
              <img v-lazy="artistImg.cover" alt="" @click="toArtistDetail(artistImg.id)"/>
              <span>{{ mvListData.artistName }}</span>
            </div>
            <div class="div2">
              <span>发布：{{ mvListData.publishTime }}</span>
              <span>播放数：{{ mvListData.playCount }}次</span>
            </div>
            <!-- 点赞评论 -->
            <div class="div3">
              <span>点赞次数：{{ mvListInfoData.likedCount }}</span>
              <span>转发条数：{{ mvListInfoData.shareCount }}</span>
              <span>评论数：{{ mvListInfoData.commentCount }}</span>
            </div>
          </div>
          <!-- mv视频评论区 -->
          <div class="boxComment">
            <Comment :Id="mvId" :type="1"/>
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              type="border-card"
            >
              <!-- 最新评论信息 -->
              <el-tab-pane :label="'最新评论（' + total + ')'" name="comments">
                <div
                  class="comment"
                  v-for="item in mvListCommentData"
                  :key="item.commentId"
                >
                  <img v-lazy="item.user.avatarUrl" alt="" />
                  <div class="commentSpan">
                    <span class="span"
                      >{{ item.user.nickname }} ：<span class="span1">{{
                        item.content
                      }}</span></span
                    >
                    <span class="span2">{{ item.time | dateFormat }}</span>
                  </div>
                  <div class="icon">
                    <i class="el-icon-thumb"></i>
                    {{ item.likedCount }}
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
              <!-- 热门评论信息 -->
              <el-tab-pane
                :label="'热门评论（' + totals + ')'"
                name="hotComments"
              >
                <div
                  class="comment"
                  v-for="item in mvListHotCommentData"
                  :key="item.commentId"
                >
                  <img v-lazy="item.user.avatarUrl" alt="" />
                  <div class="commentSpan">
                    <span class="span"
                      >{{ item.user.nickname }} ：<span class="span1">{{
                        item.content
                      }}</span></span
                    >
                    <span class="span2">{{ item.time | dateFormat }}</span>
                  </div>
                  <div class="icon">
                    <i class="el-icon-thumb"></i>
                    {{ item.likedCount }}
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <!-- 右侧部分 -->
        <el-col :span="8" class="col2">
          <h3>相似推荐视频</h3>
          <!-- 每个相似视频 -->
          <div class="similarBox" v-for="item in mvListSimiData" :key="item.id">
            <!-- 左侧图片区域 -->
            <div class="img">
              <img v-lazy="item.cover" alt="" @click="toMvSini(item.id)" />
              <span class="el-icon-caret-right span1">{{
                item.playCount | formatCount
              }}</span>
              <span class="span2">{{ item.duration | formatSong }}</span>
            </div>
            <!-- 右侧名字作者区域 -->
            <div class="right">
              <span class="span1">{{ item.name }}</span>
              <span class="span2">{{ item.artistName }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  mvList,
  mvListUrl,
  mvListInfo,
  mvListComment1,
  mvListComment2,
  mvListSimi,

} from '@/common/api'
import {  artistDetail} from '@/common/artistAPI'
import Comment from '@/components/Comment'
export default {
  name: 'MvList',
  data() {
    return {
      mvId: 0, // mv视频id
      mvListData: {}, // 保存mv视频信息
      mvListUrlData: '', // mv视频url地址
      mvListInfoData: {}, // mv视频点赞评论数
      activeName: 'comments', // tags标签默认激活
      offset: 1,
      limit: 20,
      total: 11891,
      totals: 15,
      mvListHotCommentData: [], // 热门评论信息
      mvListCommentData: [], // 最新评论信息
      mvListSimiData: [], // 相似歌曲信息
      artistId:0, // 歌手id
      artistImg:{} // 歌手头像
    }
  },
  components:{Comment},
  mounted() {
    this.mvId = this.$route.params.id
    this.getMvList()
    this.getMvListComment()
    this.getMvListSimi()
    this.getOpen()
  },
  methods: {
    // 获取mv视频、信息的回调
    async getMvList() {
      const { data: res } = await mvList(this.mvId)
      if (res.code !== 200) {
        this.$message.error('获取单个视频信息失败')
      }
      this.mvListData = res.data
      this.artistId = res.data.artistId

      const {data:resImg} = await artistDetail(this.artistId)
      this.artistImg = resImg.data.artist

      const { data: res1 } = await mvListUrl(this.mvId)
      if (res1.code !== 200) {
        this.$message.error('获取单个视频播放地址失败')
      }
      // this.mvListUrlData = res1.data.url
      this.$refs.video.src = res1.data.url

      const { data: res2 } = await mvListInfo(this.mvId)
      if (res2.code !== 200) {
        this.$message.error('获取单个视频点赞转发失败')
      }
      this.mvListInfoData = res2
      this.total = res2.commentCount

      const { data: res3 } = await mvListComment1(this.mvId)
      // console.log(res3)
      if (res3.code !== 200) {
        this.$message.error('获取单个视频热门评论失败')
      }
      this.mvListHotCommentData = res3.hotComments
      this.totals = res3.hotComments.length
    },
    // 获取mv视频最新评论的回调
    async getMvListComment() {
      const { mvId, offset, limit } = this
      let result = (offset-1)*limit
      const { data: res4 } = await mvListComment2(mvId, result , limit)
      if (res4.code !== 200) {
        this.$message.error('获取单个视频最新评论失败')
      }
      this.mvListCommentData = res4.comments
    },
    // 获取相似歌曲的回调
    async getMvListSimi() {
      const { data: res } = await mvListSimi(this.mvId)
      this.mvListSimiData = res.mvs
      // console.log(11);
    },
    // 点击相似视频显示对应内容回调
    toMvSini(value) {
      // console.log(this.$router);
      this.$router.push({ name: 'MvList', params: { id: value } })
      this.mvId = value
      this.getMvList()
      this.getMvListComment()
      this.getMvListSimi()
    },
    // 监听tags标签切换
    handleClick() {},
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getMvListComment()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getMvListComment()
    },
    // 页面加载显示内容
    getOpen() {
      this.$notify({
        title: '提示',
        message: '单击视频就可以播放哦',
        offset: 100
      })
    },
    // 跳转至歌手详情界面
    toArtistDetail(valueId) {
      this.$router.push({ name: 'ArtistDetail', params: { id: valueId } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  padding: 0;
}
.col1 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    position: absolute;
    top: 0;
    left: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: black;
    i {
      font-size: 20px;
    }
  }
  .video {
    width: 600px;
    height: 400px;
    margin: 65px 0 20px;
    cursor: pointer;
    video {
      width: 100%;
      object-fit: fill;
    }
  }
  .boxSpan {
    height: 230px;
    span {
      font-size: 32px;
      font-weight: bold;
    }
    .div1 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
      }
      span {
        font-size: 20px;
        font-weight: normal;
        margin-left: 20px;
      }
    }
    .div2 {
      margin-bottom: 20px;
      span {
        font-size: 16px;
        margin: 0 20px;
        color: #aaa;
      }
    }
    .div3 {
      span {
        font-size: 16px;
        margin: 0 20px;
      }
    }
  }
  .boxComment {
    width: 100%;
    min-width: 710px;
    // height: 3000px;
    .comment {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 120px;
      margin-bottom: 20px;
      padding: 0 10px;
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
          font-size: 17px;
          color: royalblue;
          text-align: left;
          margin-bottom: 5px;
          .span1 {
            font-size: 16px;
            color: rgb(114, 114, 114);
          }
        }
      }
      .icon {
        color: rgb(214, 45, 45);
        i {
          cursor: pointer;
        }
      }
    }
  }
}
.col2 {
  h3 {
    margin-bottom: 20px;
  }
  .similarBox {
    display: flex;
    height: 150px;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    .img {
      position: relative;
      img {
        width: 150px;
        height: 150px;
        border-radius: 5px;
        cursor: pointer;
      }
      .span1 {
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .span2 {
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
      span {
        color: #fff;
        font-size: 17px;
      }
    }
    .right {
      width: 150px;
      display: flex;
      flex-direction: column;
      .span1 {
        text-align: left;
        font-size: 19px;
        margin-bottom: 20px;
      }
      .span2 {
        text-align: left;
        font-size: 15px;
        color: rgb(148, 145, 145);
      }
    }
  }
}
</style>
