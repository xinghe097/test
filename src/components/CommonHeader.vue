<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>

      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <span class="el-dropdown-link">
          <i></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="{ path: '/page2' }"
            ><el-dropdown-item> 个人中心 </el-dropdown-item></router-link
          >
          <el-dropdown-item @click.native="endOut"> 退出 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      MenuData: [
        {
          label: "其他",
          icon: "location",
          //   这是子栏里的内容
          children: [
            {
              path: "/page2",
              name: "page2",
              label: "个人中心",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("COLLAPSE_MENU");
    },
    endOut() {
      this.$router.push("/login");
      window.sessionStorage.clear();
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding-left: 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>