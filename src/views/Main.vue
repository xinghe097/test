<template>
  <div>
    <el-container>
      <common-aside />
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  data() {
    return {};
  },
  //侧栏和头部的组件
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>