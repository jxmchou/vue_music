<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>歌手</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/singer' }"
          ><span class="span" title="点击跳转至云音乐歌手排行榜"
            >歌手榜</span
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- 歌手头部 -->
      <div class="artistHeader">
        <!-- 语种 -->
        <div class="artistBox">
          <span>{{ values.name }}</span>
          <ul>
            <li
              :class="{ changeColor: changeIndex1 === index }"
              v-for="(item, index) in values.value"
              :key="item.index"
              @click="handleToArea(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- 分类 -->
        <div class="artistBox">
          <span>{{ value2.name }}</span>
          <ul>
            <li
              :class="{ changeColor: changeIndex2 === index }"
              v-for="(item, index) in value2.value"
              :key="index"
              @click="handleToType(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- 筛选 -->
        <div class="artistBox3">
          <span>筛选：</span>
          <ul>
            <li
              :class="{ changeColor: changeIndex3 === index }"
              v-for="(item, index) in value3"
              :key="index"
              @click="handleInitial(item, index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 歌手主体 -->
      <div class="artistMain">
        <!-- 带图片区域 -->
        <div class="mainTop">
          <div class="mainBox" v-for="item in singerListData1" :key="item.id">
            <img v-lazy="item.picUrl" alt="" @click="toArtistDetail(item.id)" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <!-- 文本区域 -->
        <div class="mainBottom">
          <div
            class="mainSpan"
            v-for="item in singerListData2"
            :key="item.id"
            @click="toArtistDetail(item.id)"
          >
            <span :title="item.name + '的音乐'"
              >{{ item.name }} <i class="el-icon-user-solid"></i
            ></span>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="offset"
        :page-sizes="[30, 50, 100]"
        :page-size="limit"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
import { singerList } from '@/common/artistAPI'
export default {
  name: 'Artist',
  data() {
    return {
      values: {
        name: '语种：',
        value: [
          { name: '全部', area: -1 },
          { name: '华语', area: 7 },
          { name: '欧美', area: 96 },
          { name: '日本', area: 8 },
          { name: '韩国', area: 16 },
          { name: '其他', area: 0 }
        ]
      },
      value2: {
        name: '分类：',
        value: [
          { name: '全部', type: -1 },
          { name: '男歌手', type: 1 },
          { name: '女歌手', type: 2 },
          { name: '乐队组合', type: 3 }
        ]
      },
      value3: [
        '热门',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '#'
      ],
      changeIndex1: 0, // 控制语种激活
      changeIndex2: 0, // 控制分类激活
      changeIndex3: 0, // 控制筛选激活
      area: -1, // 语种/地区参数
      type: -1, // 分类/歌手参数
      initial: -1, // 筛选参数
      offset: 1,
      limit: 30,
      total: 1000,
      singerListData1: [], // 带头像歌手数据
      singerListData2: [] // 文本歌手数据
    }
  },
  created() {
    this.getSingerList()
  },
  mounted() {},
  methods: {
    // 点击语种/地区回调
    handleToArea(value, index) {
      this.changeIndex1 = index
      this.area = value.area
      this.offset = 1
      this.getSingerList()
    },
    // 点击分类/歌手回调
    handleToType(value, index) {
      this.changeIndex2 = index
      this.type = value.type
      this.offset = 1
      this.getSingerList()
    },
    // 点击筛选回调
    handleInitial(value, index) {
      this.changeIndex3 = index
      this.initial = value
      this.offset = 1
      this.getSingerList()
    },
    // 挑战至歌手详情界面
    toArtistDetail(valueId) {
      this.$router.push({ name: 'ArtistDetail', params: { id: valueId } })
    },
    // 获取歌手信息回调
    async getSingerList() {
      const { area, type, initial, offset, limit } = this
      let result = (offset-1)*limit
      const { data: res } = await singerList(
        area,
        type,
        initial,
        result,
        limit
      )
      // console.log(res);
      if (res.code !== 200) {
        this.$message.error('获取歌手信息失败')
      }
      this.singerListData1 = res.artists.slice(0, 10)
      this.singerListData2 = res.artists.slice(10)
      // console.log(this.singerListData1.length,this.singerListData2.length);
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getSingerList()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getSingerList()
    },
    // 跳转至歌手详情界面
    // toArtistDetail(valueId) {
    //   this.$router.push({ name: 'ArtistDetail', params: { id: valueId } })
    // }
  }
}
</script>

<style lang="less" scoped>
.span {
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: rgb(43, 132, 233);
  }
}
.changeColor {
  color: rgb(224, 71, 97);
}
.artistHeader {
  .artistBox {
    display: flex;
    align-items: center;
    margin: 10px 0;
    height: 30px;
    span {
      font-size: 18px;
    }
    ul {
      display: flex;
      // flex: 1;
      li {
        width: 70px;
        cursor: pointer;
      }
    }
  }
  .artistBox3 {
    display: flex;
    align-items: center;
    margin: 10px 0;
    height: 30px;
    span {
      font-size: 18px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // flex: 1;
      li {
        width: 30px;
        cursor: pointer;
        &:nth-child(1) {
          width: 70px;
        }
      }
    }
  }
}

.artistMain {
  .mainTop {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .mainBox {
      width: 18%;
      height: 210px;
      margin-bottom: 10px;
      background-color: rgb(230, 230, 230);
      img {
        width: 95%;
        height: 172px;
        cursor: pointer;
      }
      span {
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .mainBottom {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .mainSpan {
      width: 18%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 10px;
      background-color: rgb(230, 230, 230);
      span {
        font-size: 18px;
        .el-icon-user-solid {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
