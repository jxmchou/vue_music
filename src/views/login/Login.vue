<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>

      <!-- 登录表单区域 -->
      <el-form
        class="login_form"
        label-width="70px"
        :model="loginForm"
        :rules="loginFromRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="phone" label="手机号">
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-user-solid"
            :placeholder="loginType ? '请输入手机号码' : '请输入要注册的手机号'"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            :placeholder="loginType ? '请输入登录密码' : '请输入注册密码'"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="getLogin">{{
            loginType ? '登录' : '注册'
          }}</el-button>
          <el-button type="success" @click="getRegister">{{
            loginType ? '注册账号' : '返回登录'
          }}</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 退出返回按钮 -->
      <div class="el-icon-switch-button" @click="backHome"></div>
    </div>
  </div>
</template>

<script>
// import 'animate.css'
// import { mapGetters, mapState } from 'vuex'
// import { phoneLogin } from '@/common/api'
export default {
  name: 'Login',
  data() {
    // 自定义验证手机号规则
    var checkMobile = (rule, value, callback) => {
      let regMobile =
        /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        callback() // 合法手机号
      } else {
        callback(new Error('请输入合法的手机号'))
      }
    }
    // 自定义验证密码规则
    var checkPassword = (rule, value, callback) => {
      let regPW = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      if (regPW.test(value)) {
        callback() // 合法密码
      }
      callback(new Error('请输入合法的密码'))
    }
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        phone: '',
        password: ''
      },
      // 表单的验证规则对象
      loginFromRules: {
        phone: [
          // 手机号
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [
          // 密码
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      loginType: true, // 控制登录/注册
      loginListData: {},
      items: {}
    }
  },
  computed: {
    // ...mapGetters(['getToken']),
    // ...mapState(['loginData'])
  },
  methods: {
    // 点击重置登录按钮
    resetLoginFrom() {
      this.$refs.loginFormRef.resetFields()
      this.loginType = true
    },
    // 登录信息回调
    getLogin() {
      this.$refs.loginFormRef.validate(async (value) => {
        if (!value) {
          return this.$message.error('验证失败!重新输入~')
        }
        this.$store.dispatch('getLoginData', this.loginForm)
        setTimeout(() => {
          this.$router.back()
        }, 800)
        // try {

        // } catch (error) {
        //   console.log(error)
        // }
      })
    },
    // 注册信息回调
    getRegister() {
      this.loginType = !this.loginType
      this.$message.info('虚拟按钮，模拟样式')
    },
    // 退出返回主页面
    backHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  position: relative;
  height: 100%;
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
}
.login_box {
  // display: none;
  width: 420px;
  height: 450px;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  border-radius: 3%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: box_login 1.5s;

  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 100px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 20px #ddd;
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .btns {
      height: 200px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .el-button {
        width: 250px;
        margin-left: 0;
        margin: 10px;
      }
    }
  }
}
.el-icon-switch-button {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 30px;
  color: pink;
  cursor: pointer;
}
@keyframes box_login {
  form {
    top: 0%;
  }
  50% {
    top: 25%;
  }
  75% {
    top: 60%;
  }
  to {
    top: 50%;
  }
}
</style>
