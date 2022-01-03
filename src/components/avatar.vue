<template>
  <div>
    <div class="box2" v-if="userName" @mouseenter="test1" @mouseleave="test2">
      <img
        :title="loginData.name"
        :src="loginData.avatar"
        alt=""
        class="avatar"
      />
      <!-- 移入头像显示主页 -->
      <div
        class="box"
        :style="{ display: show ? 'block' : 'none' }"
        @mouseenter="test1"
      >
        <ul>
          <li
            v-for="(item, index) in boxData"
            :key="index"
            @click="outLoginData1(item.title)"
          >
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <!-- <span class="span1" :title="`${loginData.name}的个人主页`">{{loginData.name}}</span> -->
      <!-- <span class="span2" title="退出登录按钮" @click="outLoginData"
        >退出登录</span
      > -->
    </div>
    <div class="box1" v-else="!userName">
      <img src="../assets/touX.jpg" alt="" class="avatar" />
      <span class="span" title="跳转至登录界面" @click="toLogin"
        >登录 / 注册</span
      >
    </div>
  </div>
</template>
<script>
import { outLogin } from '@/common/api'
export default {
  name: 'Avatar',
  data() {
    return {
      loginData: {},
      show: false,
      boxData: [
        { icon: 'icon-user', title: '我的主页' },
        { icon: 'icon-duanxin', title: '我的消息' },
        { icon: 'icon-xunzhang', title: '我的等级' },
        { icon: 'icon-VIP', title: 'VIP会员' },
        { icon: 'icon-home', title: '个人设置' },
        { icon: 'icon-anquandunpai', title: '实名认证' },
        { icon: 'icon-guanji', title: '退出登录' }
      ]
    }
  },
  computed: {
    userName() {
      return this.$store.state.loginData.name
    }
  },
  mounted() {
    this.loginData = JSON.parse(window.sessionStorage.getItem('loginData'))
  },
  methods: {
    // 跳转至login登录页面
    toLogin() {
      this.$router.push('/login')
    },
    async outLoginData() {
      this.$message.info('测试')
    },
    async outLoginData1(value) {
      if (value == '退出登录') {
        const { data: res } = await outLogin()
        if (res.code === 200) {
          this.$message.success('成功退出登录')
        }
        this.$store.commit('outLogin')
      }
      if(value === '我的主页'){
        this.$router.push('/home')
        this.show = false
      }
    },
    test1() {
      this.show = true
    },
    test2() {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}
span {
  cursor: pointer;
}
.box2 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  height: 60px;

  .box {
    // display: none;
    position: absolute;
    left: -120%;
    top: 100%;
    width: 180px;
    height: 210px;
    background-color: #aaa;
    color: #fff;
    z-index: 999;
    li {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      &:hover {
        background-color: #bbb;
      }
      i {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
  }
  .span2 {
    box-sizing: border-box;
    background-color: #ccc;
    display: inline-block;
    width: 70px;
    height: 38px;
    line-height: 38px;
    color: rgb(105, 105, 105);
    border-radius: 5px;
    border: 1px rgb(151, 149, 149) solid;
    &:hover {
      color: rgb(71, 71, 71);
      border-color: black;
    }
  }
  .span1 {
    margin-right: 5px;
  }
}
</style>
