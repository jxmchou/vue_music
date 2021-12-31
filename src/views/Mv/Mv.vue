<template>
  <div>
    <el-card>
      <div class="MvHeader">
        <div class="MvHeadBox">
          <span>{{ values[0] }}</span>
          <ul>
            <li
              :class="{ activeColor: changeIndex1 === index }"
              v-for="(item, index) in value1"
              :key="index"
              @click="handleToMv1(item, index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="MvHeadBox">
          <span>{{ values[1] }}</span>
          <ul>
            <li
              :class="{ activeColor: changeIndex2 === index }"
              v-for="(item, index) in value2"
              :key="index"
              @click="handleToMv2(item, index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="MvHeadBox">
          <span>{{ values[2] }}</span>
          <ul>
            <li
              :class="{ activeColor: changeIndex3 === index }"
              v-for="(item, index) in value3"
              :key="index"
              @click="handleToMv3(item, index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="MvContainer">
        <div class="MvItem" v-for="(item, index) in AllMvList" :key="item.id">
          <img v-lazy="item.cover" alt="" @click="toMvList(item.id)"/>
          <span class="span1">{{ item.name }}</span>
          <span class="span2">{{ item.artists[0].name }}</span>
          <span class="el-icon-video-play">{{
            item.playCount | formatCount
          }}</span>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="offset"
          :page-sizes="[8, 16, 28]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { allMvLists } from '@/common/api'
export default {
  name: 'Mv',
  data() {
    return {
      values: ['地区：', '类型：', '排序：'],
      value1: ['全部', '内地', '港区', '欧美', '日本', '韩国'],
      value2: ['全部', '官方版', '原生', '现场版', '网易出品'],
      value3: ['上升最快', '最热', '最新'],
      changeIndex1: 0,
      changeIndex2: 0,
      changeIndex3: 1,
      AllMvList: [],
      area: '全部',
      type: '全部',
      order: '最热',
      total: 8,
      offset: 1,
      limit: 8,
      
    }
  },
  created() {},
  mounted() {
    this.getAllMvList()
  },
  methods: {
    handleToMv1(value,index) {
      this.changeIndex1 = index
      this.area = value
      this.offset=1
      this.getAllMvList()
    },
    handleToMv2(value,index) {
      this.changeIndex2 = index
      this.type = value
      this.offset=1
      this.getAllMvList()
    },
    handleToMv3(value,index) {
      this.changeIndex3 = index
      this.order = value
      this.offset=1
      this.getAllMvList()
    },
    async getAllMvList() {
      const { area, type, order, offset, limit } = this
      let result = (offset-1)*limit
      const { data: res } = await allMvLists(
        area,
        type,
        order,
        result,
        limit
      )
      // console.log(res);
      this.AllMvList = res.data
      if(this.offset==1){
        this.total = res.count
      }
    },
    // 监听 pagesize 每页条数 改变的事件
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.limit = newSize
      this.getAllMvList()
    },
    // 监听 pagenum 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`)
      this.offset = newPage
      this.getAllMvList()
    },
    // 跳转至详细的播放界面
    toMvList(value){
      this.$router.push({name:'MvList',params:{id:value}})
    }
  }
}
</script>

<style lang="less" scoped>
.MvHeader {
  height: 130px;
  .MvHeadBox {
    display: flex;
    align-items: center;
    // justify-content: start;
    margin: 10px 0;
    height: 30px;
    span {
      font-size: 18px;
      margin-right: 20px;
    }
    ul {
      display: flex;
      // flex: 1;
      li {
        width: 80px;
        cursor: pointer;
      }
    }
  }
  .activeColor {
    color: rgb(236, 73, 100);
  }
}
.MvContainer {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .MvItem {
    position: relative;
    width: 22%;
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
      text-align-last: left;
      padding: 5px 0 0 5px;
      font-size: 15px;
    }
    .span1 {
      width: 220px;
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
      top: 5px;
      right: 10px;
      font-size: 22px;
      color: #ccc;
    }
  }
}
</style>
