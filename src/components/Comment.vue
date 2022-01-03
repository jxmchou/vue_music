<template>
  <div class="box clearfix">
    <!-- 自主评论区域 -->
    <div class="textarea">
      <div class="head">
        <img v-lazy="user.avatar" alt="" />
      </div>
      <div class="text">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="130"
          show-word-limit
          @focus="focusComment(textarea)"
        >
        </el-input>
      </div>
    </div>
    <div class="icons">
      <span @click="handSendComment">评论</span>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/common/comment'
export default {
  props: ['Id', 'type'],
  data() {
    return {
      textarea: '', // 评论
      user: {
        avatar: ''
      }
    }
  },
  mounted() {
    this.user = window.sessionStorage.getItem('loginData') || {}
  },
  methods: {
    // 点击发送评论
    async handSendComment() {
      if (!this.textarea) {
        return this.$message.info('没有评论点击无效哦！')
      }
      if (this.textarea.trim()) {
        let { type, Id, textarea } = this
        let { data: res } = await sendComment(1, type, Id, textarea)
        this.textarea = ''
        if (res.code !== 200) {
          this.$message.error('评论接口失败')
        }
      } else {
        this.$message.info('请先填写评论哦')
      }
    },
    // 检测是否登录
    focusComment() {
      const token = window.sessionStorage.getItem('token')
      if (!token) {
        this.$message.error('评论歌曲需要先登录哦，可以点击右上角登录哦！')
      }
    }
  }
}
</script>

<style lang="less">
.box {
  margin-bottom: 20px;
}
.textarea {
  display: flex;
  .head {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    flex: 1;
    width: 100%;
    margin-left: 20px;
    // textarea {
    //   width: 97%;
    //   height: 70px;
    //   padding: 10px;
    //   resize: none;
    // }
  }
}
.icons {
  float: right;
  margin-top: 5px;
  cursor: pointer;
  width: 70px;
  height: 30px;
  line-height: 30px;
  background-color: #ccc;
  border-radius: 3px;
  span {
    font-size: 14px;
  }
}
</style>
