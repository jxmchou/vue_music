<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/artist' }"
          >歌手</el-breadcrumb-item
        >
        <el-breadcrumb-item>歌手榜</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 头部标签 -->
      <div class="title">
        <ul>
          <li
            :class="{ changeColor: changeIndex === index }"
            v-for="(item, index) in title"
            :key="index"
            @click="handleToData(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 歌手榜其余 -->
      <div class="singerBox">
        <ul>
          <li v-for="(item, index) in defaultSingerData" :key="item.id">
            <span class="span1">{{ index + 1 }}</span>
            <img v-lazy="item.picUrl" alt="" :title="item.name + '的音乐'"
            @click="toArtistDetail(item.id)"/>
            <div class="span2">
              <span>{{ item.name }}</span>
              <span class="span3">热度：{{ item.score }}</span>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defaultSinger, singers } from '@/common/artistAPI'
export default {
  name: 'Singer',
  data() {
    return {
      title: ['华语', '欧美', '韩国', '日本'], // 参数分类
      changeIndex: 0,
      type: 1,
      defaultSingerData: [] // 默认华语歌手数据
    }
  },
  created() {
    
    this.getDefaultSinger()
  },
  methods: {
    // 点击分类参数调用数据
    handleToData(index) {
      this.changeIndex = index
      this.type = index+1
      this.getSingers()
    },
    // 默认华语歌手榜数据
    async getDefaultSinger() {
      const { data: res } = await defaultSinger()
      if (res.code !== 200) {
        this.$message.error('获取歌手排行榜数据失败')
      }
      this.defaultSingerData = res.list.artists
    },
    // 分类数据
    async getSingers() {
      const { type } = this
      const { data: res } = await singers(type)
      this.defaultSingerData = res.list.artists
    },
    // 跳转至歌手详情界面
    toArtistDetail(valueId) {
      this.$router.push({ name: 'ArtistDetail', params: { id: valueId } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-left: 10px;
}
.changeColor {
  color: rgb(235, 45, 45);
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  ul {
    display: flex;
    align-items: center;
    li {
      width: 50px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.singerBox {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      background-color: rgb(255, 250, 250);
      width: 100%;
      height: 100px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      .span1 {
        width: 40px;
        font-size: 30px;
        margin-left: 40px;
      }
      img {
        width: 123px;
        height: 100%;
        margin-left: 40px;
        cursor: pointer;
      }
      .span2 {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 0 40px;
        .span3 {
          color: #bbb;
        }
      }

      /* &:nth-child(-n + 3) {
        background-color: rgb(255, 250, 250);
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 33%;
        height: 120px;
        .span1 {
          font-size: 40px;
          color: pink;
        }
        img {
          width: 118px;
          height: 100%;
        }
        .span2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding: 0;
          span {
            margin-bottom: 5px;
          }
        }
      } */
      &:nth-child(n + 21) {
        height: 50px;
        line-height: 50px;
        background-color: rgb(255, 250, 250);
        .span1 {
          width: 20px;
          font-size: 20px;
          margin-left: 20px;
        }
        img {
          width: 70px;
          height: 100%;
          margin-left: 20px;
        }
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
