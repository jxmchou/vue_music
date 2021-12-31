<template>
  <div id="goTop">
    <div class="goTop" v-show="goTopShow" @click="goTop">
      <i class="el-icon-thumb goTopIcon"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goTop',
  data() {
    return {
      scrollTop: 0,
      goTopShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
        console.log(window.pageXOffset,'-----------',window.pageYOffset);
      if (this.scrollTop > 800) {
        this.goTopShow = true
      }
    },
    goTop() {
      let timer = null,
        _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 800) {
          _that.scrollTop -= 50
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.goTopShow = false
        }
      })
    }
  },
  watch: {
    scrollTop() {
      if (this.scrollTop > 800) {
        this.goTopShow = true
      } else {
        this.goTopShow = false
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.goTop {
  position: fixed;
  right: 120px;
  bottom: 90px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}
.goTop:hover .goTopIcon {
  color: pink;
}
.goTopIcon {
  font-size: 30px;
  color: rgb(233, 199, 205);
  line-height: 40px;
  margin-left: 3px;
}
</style>