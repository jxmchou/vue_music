<template>
  <el-container>
    <el-header> Header </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        
        <img src="../assets/success1.jpg" alt="">
        <img src="../assets/success1.jpg" alt="">
        <img src="../assets/success1.jpg" alt="">
        <el-backtop>
          <i class="el-icon-thumb"></i>
        </el-backtop>
        <!-- <GoTop /> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import GoTop from '@/views/index/GoTop.vue'
export default {
  mounted() {
    // console.log(window)
  },
  components: {
    // GoTop,
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgba(249, 249, 249, 0.5);
  box-shadow: 0 1px 1px red;
  padding: 0;
  max-height: 50px;
  min-height: 48px;
  margin-bottom: 2px;
}
.el-aside {
  border-right: 1px solid rgba(200, 200, 200, 0.3);
}
.el-main {
  // overflow: auto;
  padding: 0 100px 10px;
  height: 100%;
  .main {
    overflow: scroll;
    height: 100%;
  }
}
</style>
