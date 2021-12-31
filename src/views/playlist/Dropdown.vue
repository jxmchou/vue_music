<template>
  <div>
    <!-- 按钮 -->
    <div class="btn">
      选择分类<i class="el-icon-caret-top"></i>
      <!-- 下拉区域 -->
      <ul class="box">
        <li v-for="item in value" :key="item.name">
          <div class="left"><i :class="item.icon"></i>{{ item.name }}</div>
          <div class="right">
            <ul>
              <li
                v-for="(items, index) in item.values"
                :key="index"
                @click="handleName(items)"
              >
                {{ items }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      value: [
        {
          icon: 'el-icon-s-operation',
          name: '语种',
          values: ['华语', '欧美', '日语', '韩语', '粤语']
        },
        {
          icon: 'el-icon-document',
          name: '风格',
          values: [
            '流行',
            '摇滚',
            '民谣',
            '电子',
            '舞曲',
            '说唱',
            '轻音乐',
            '爵士',
            '乡村',
            'R&B/Soul',
            '古典',
            '民族',
            '英伦',
            '金属',
            '蓝调',
            '雷鬼',
            '世界音乐',
            '拉丁',
            'New Age',
            '古风',
            'Bossa Nova'
          ]
        },
        {
          icon: 'el-icon-coin',
          name: '场景',
          values: [
            '清晨',
            '夜晚',
            '学习',
            '工作',
            '午休',
            '下午茶',
            '地铁',
            '驾车',
            '运动',
            '旅行',
            '散步',
            '酒吧'
          ]
        },
        {
          icon: 'el-icon-sunset',
          name: '情感',
          values: [
            '怀旧',
            '清新',
            '浪漫',
            '伤感',
            '治愈',
            '放松',
            '孤独',
            '感动',
            '兴奋',
            '快乐',
            '安静',
            '思念'
          ]
        },
        {
          icon: 'el-icon-service',
          name: '主题',
          values: [
            '综艺',
            '影视原声',
            'ACG',
            '儿童',
            '校园',
            '游戏',
            '70后',
            ' 80后',
            '90后',
            '网络歌曲',
            'KTV',
            '经典',
            '翻唱',
            '吉他',
            '钢琴',
            '器乐',
            '榜单',
            '00后'
          ]
        }
      ]
    }
  },
  methods: {
    handleName(value) {
      this.$emit('getCat',value)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    .box {
      display: block;
      height: 400px;
      border-radius: 5px;
      box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
    }
    .el-icon-caret-top {
      height: 34px;
    }
  }
}
.box {
  z-index: 999;
  position: absolute;
  top: 65px;
  left: -140px;
  width: 900px;
  height: 0px;
  transition: all 0.5s;
  overflow: hidden;
  background-color: rgb(243, 243, 243);

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 10px 0;
    // height: 60px;
    .left {
      width: 11%;
      font-weight: bold;
      font-size: 18px;
      i {
        padding-right: 5px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      // width: 17%;
      margin: 0 5px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 30px;
          height: 25px;
          margin: 0 5px 5px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            border-color: #aaa;
          }
        }
      }
    }
    &:nth-child(2) {
      .right {
        ul {
          li {
            &:nth-child(7) {
              width: 50px;
            }
            &:nth-child(10) {
              width: 70px;
            }
            &:nth-child(17) {
              width: 60px;
            }
            &:nth-child(19) {
              width: 65px;
            }
            &:nth-child(21) {
              width: 80px;
            }
          }
        }
      }
    }
    &:nth-child(3) {
      .right {
        ul li {
          &:nth-child(6) {
            width: 50px;
          }
        }
      }
    }
    &:nth-child(5) {
      .right {
        ul li {
          &:nth-child(2) {
            width: 60px;
          }
          &:nth-child(7) {
            width: 40px;
          }
          &:nth-child(8) {
            width: 40px;
          }
          &:nth-child(9) {
            width: 40px;
          }
          &:nth-child(10) {
            width: 60px;
          }
          &:last-child {
            width: 40px;
          }
        }
      }
    }
  }
}
.el-icon-caret-top {
  position: absolute;
  top: 41px;
  left: -400px;
  font-size: 35px;
  color: #bbb;
  width: 900px;
  height: 0px;
  overflow: hidden;
}
</style>
