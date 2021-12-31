<template>
  <div>
    <el-card>
      <div class="header">
        <div class="headLeft">
          <span class="span1">全部歌单</span>
          <!-- 下拉区域 -->
          <Dropdown @getCat="getCat" />
        </div>
        <div class="headRight">
          <div>精品歌单：</div>
          <span
            :class="{ changeColor: changeIndex === index }"
            v-for="(item, index) in hotTagsData"
            :key="item.id"
            @click="handleToSong(item.name, index)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <!-- 歌单区域 -->
      <div class="box">
        <div class="hotItem">
          <div class="hotList" v-for="(item,index) in playListsData" :key="index">
            <div class="imgItem">
              <img
                v-lazy="item.coverImgUrl"
                alt=""
                @click="toSongDetail(item.id)"
              />
              <div class="item">
                <i class="el-icon-headset"></i>
                <span>{{ item.playCount | formatCount }}</span>
                <i class="el-icon-video-play play"></i>
              </div>
            </div>
            <div class="hotSpan">
              <span class="span1">{{ item.name }}</span>
              <span class="span2">{{ item.creator.nickname }} </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="offset"
        :page-sizes="[20, 35, 50]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        v-show="playListsData.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue'
import { playLists, hotTags, highQuality } from '@/common/playlistAPI'
export default {
  name: 'PlayList',
  data() {
    return {
      playListsData: [], // 存放所有歌单信息 / 精品歌单数据
      hotTagsData: [], // 存放精品歌单标签数据
      offset: 1,
      limit: 20,
      total: 20,
      cat: '全部', // 参数分类
      changeIndex: -1, // 控制激活精品标签
      lastTime: 0, // 精品歌单分页参数
      highQualityData: [] // 精品歌单数据
    }
  },
  components: {
    Dropdown
  },
  created() {
    this.getPlayLists()
    this.getHotTags()
  },
  mounted() {},
  methods: {
    // 获取所有歌单
    async getPlayLists() {
      const { offset, limit, cat } = this
      let result = (offset-1)*limit
      const { data: res } = await playLists(result , limit, cat)
      if (res.code !== 200) {
        return this.$message.error('获取所有歌单数据失败')
      }
      this.total = res.total
      this.playListsData = res.playlists
      // console.log(res);
      // res.playlists.length = 5
      // console.log(res.playlists[0].creator.avatarDetail.identityIconUrl);
    },
    // 点击下拉标签获取数据
    getCat(value) {
      this.playListsData = []
      this.cat = value
      this.offset = 1
      this.getPlayLists()
      this.changeIndex = -1
    },
    // 获取精品歌单标签
    async getHotTags() {
      const { data: res } = await hotTags()
      if (res.code !== 200) {
        return this.$message.error('获取热门标签数据失败')
      }
      res.tags.forEach((item) => {
        const result = { id: item.id, name: item.name }
        this.hotTagsData.push(result)
      })
      this.hotTagsData.length = 6
      // console.log(this.hotTagsData);
    },
    // 点击精品标签跳转
    handleToSong(value, index) {
      this.playListsData = []
      this.changeIndex = index
      this.cat = value
      this.lastTime = 0
      this.offset = 1
      this.getHighQuality()
    },
    // 获取精品歌单
    async getHighQuality() {
      const {lastTime, limit, cat } = this
      const { data: res } = await highQuality(lastTime, limit, cat)
      if(this.lastTime==0){
        this.total = res.total
      }
      this.lastTime = res.lasttime
      this.playListsData = res.playlists
      
    },
    // 监听 limit 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      if (this.lastTime == 0) {
        this.limit = newSize
        this.getPlayLists()
      } else {
        this.limit = newSize
        this.getHighQuality()
      }
    },
    // 监听 offset 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`)
      if (this.lastTime == 0) {
        this.offset = newPage
        this.getPlayLists()
      } else {
        // this.offset = this.lastTime
        this.getHighQuality()
      }
    },
    // 点击跳转对应歌单详情界面
    toSongDetail(value) {
      this.$router.push({ name: 'SongDetail', params: { id: value } })
    }
  },
  watch: {
    // playListsData: function () {
    //   this.changeIndex = -1
    // }
  }
}
</script>

<style lang="less" scoped>
.changeColor {
  color: rgb(219, 24, 56);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #eee;
  padding: 0 5px;
  margin-bottom: 20px;
  .headLeft {
    display: flex;
    align-items: center;
    .span1 {
      font-size: 24px;
      margin-right: 20px;
    }
  }
  .headRight {
    display: flex;
    width: 55%;
    min-width: 680px;
    div {
      font-size: 20px;
      color: pink;
    }
    span {
      flex: 0.15;
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
.box {
  width: 100%;
  .hotItem {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .hotList {
      width: 18%;
      height: 300px;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 70px;
        line-height: 1.5;
        text-align: left;
        span {
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .span2 {
          font-size: 13px;
          color: #ccc;
          padding: 0 5px 0 5px;
          img {
            width: 13px;
            width: 13px;
          }
        }
      }
    }
  }
}
</style>
