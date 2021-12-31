<template>
  <div>
    <el-card>
      <!-- 调用首页热门推荐模块 -->
      <div class="hotHead">
        <div class="hotHeadLeft">
          <span>全部新碟</span>
          <ul>
            <li
              :class="{changeColor:changeIndex === index}"
              v-for="(item, index) in title"
              :key="index"
              @click="handleToAlum(item.am,index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 每一首新碟内容 -->
      <div class="discBox">
        <div
          class="boxItem"
          v-for="(item, index) in topAlbumLists"
          :key="index"
        >
          <img :title="item.name" v-lazy="item.picUrl" alt="" @click="toAlbumDetail(item.id)"/>
          <span class="span1">{{ item.name }}</span>
          <span class="span2">{{ item.artists[0].name }}</span>
          <span class="el-icon-video-play"></span>
        </div>
      </div>

      <!-- 分页器 -->
      <el-pagination
        v-show="topAlbumLists.length>20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="offset"
        :page-sizes="[10, 30, 50]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {topAlbums ,newAlbum} from '@/common/api'
export default {
  name: 'Album',
  data() {
    return {
      title: [
        { name: '最新', am: '' },
        { name: '全部', am: 'ALL' },
        { name: '华语', am: 'ZH' },
        { name: '欧美', am: 'EA' },
        { name: '韩国', am: 'KP' },
        { name: '日本', am: 'JP' }
      ],
      topAlbumLists: [], // 每月的新碟歌曲
      total: 30,
      area: 'ALL',  // 参数
      offset: 1,
      limit: 30,
      changeIndex : 0,
      // newAlbumData:[], // 最新专辑
    }
  },
  created() {
    this.getNewAlbum()
  },
  methods: {
    // 获取新碟上架回调
    async getTopAlbums() {
      const { area, offset, limit } = this
      let result = (offset-1)*limit
      const { data: res } = await topAlbums(area, result, limit)
      // console.log(res);
      if (res.code !== 200) {
        this.$message.error('获取新碟歌单失败')
      }
      this.topAlbumLists = res.albums
      this.total = res.total
      // console.log(res.weekData);
    },
    // 获取最新专辑
    async getNewAlbum(){
      const {data:res} = await newAlbum()
      this.topAlbumLists = res.albums
    },
    // 点击标签调用数据
    handleToAlum(area,index) {
      this.changeIndex  = index
      this.area = area
      if(area==''){
        this.getNewAlbum()
      }else{
        this.topAlbumLists = []
        this.getTopAlbums()
      }
    },
    // 点击跳转专辑详情界面
    toAlbumDetail(value){
      this.$router.push({name:'AlbumDetail',params:{id:value}})
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getTopAlbums()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getTopAlbums()
    }
  }
}
</script>
<style lang="less" scoped>
.changeColor{
  color: rgb(219, 30, 61);
}
.hotHead {
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 2px solid pink;
  .hotHeadLeft {
    display: flex;
    align-items: center;
    span {
      color: red;
      font-size: 22px;
      margin-right: 30px;
      // cursor: pointer;
    }
    ul {
      display: flex;
      font-size: 12px;
      li {
        margin: 0 15px;
        cursor: pointer;
      }
    }
  }
}
.discBox {
  margin-top: 10px;
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
      padding: 5px 0 0 5px;
      font-size: 15px;
    }
    .span1{
      text-align-last: left;
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      bottom: 55px;
      right: 8px;
      font-size: 22px;
      color: #ccc;
    }
  }
}
</style>
