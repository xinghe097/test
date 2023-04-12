<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="black"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "管理" : "图书管理系统" }}</h3>

    <!-- <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name"> -->
    <!-- 这里的class前面的：改成了动态数据 -->
    <!-- 这是前三个导航栏 -->

    <el-menu-item>
      <i class="el-icon-s-home" index="1"></i>
      <span slot="title" @click="inHome">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span>图书管理</span>
      </template>
      <el-menu-item-group>
        <!-- <i class="el-icon-reading"></i> -->
        <el-menu-item @click="inBook1" index="2-1">书籍管理</el-menu-item>
        <el-menu-item @click="inBook2" index="2-2">借书还书</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item>
      <i class="el-icon-s-custom"></i>
      <span @click="inUser" slot="title" index="3">用户管理</span>
    </el-menu-item>
    <el-menu-item>
      <i class="el-icon-setting"></i>
      <span @click="inPerson" slot="title" index="4">个人中心</span>
    </el-menu-item>

    <!-- <i :class="`el-icon-${item.icon}`"></i> -->
    <!-- <span slot="title">{{ item.label }}</span> -->
    <!-- </el-menu-item> -->
    <!-- <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.label" :v-bind:index="item.lablel"> -->
    <!-- 这是商品管理的导航栏 -->
    <!-- <template slot="title"> -->
    <!-- <i :class="`el-icon-${item.icon}`"></i> -->
    <!-- <span slot="title">{{ item.label }}</span> -->
    <!-- </template> -->
    <!-- <el-menu-item-group v-for="subItem in item.children" :key="subItem.path"> -->
    <!-- <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{  subItem.label}}</el-menu-item> -->
    <!-- </el-menu-item-group> -->
    <!-- </el-submenu> -->
    <!-- <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item> -->
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },

        {
          label: "图书管理",
          icon: "location",
          //   这是子栏里的内容
          children: [
            {
              path: "/book",
              name: "book",
              label: "书籍管理",
              icon: "reading",
              url: "BookManage/BookManage",
            },
            {
              path: "/page1",
              name: "page1",
              label: "借书还书",
              icon: "setting",
              url: "Other/PageOne",
            },
          ],
        },
        {
          path: "/page2",
          name: "page2",
          label: "个人中心",
          icon: "setting",
          url: "Other/PageTwo",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "s-custom",
          url: "UserManage/UserManage",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    inHome() {
      this.$router.push("/home");
    },
    inBook1() {
      this.$router.push("/book");
    },
    inBook2() {
      this.$router.push("/Page1");
    },
    inUser() {
      this.$router.push("/user");
    },
    inPerson() {
      this.$router.push("/Page2");
    },
    //点击菜单
    // clickMenu(item) {
    //   console.log(item);
    //   //路由跳转，当页面的路由与跳转的路由不一致才允许跳转
    //   if (
    //     this.$route.path !== item.path &&
    //     !(this.$route.path === "/home" && item.path === "/")
    //   ) {
    //     this.$router.push(item.path);
    //   }
    // },
  },
  //computed根据依赖关系进行缓存的计算，只有在它相关依赖发生改变时才会进行更新
  computed: {
    // 对数据进行过滤
    // 分为没有子菜单
    // noChildren() {
    //   return this.menuData.filter((item) => !item.children);
    //   //依赖于menuData的变化，对数据进行过滤，使用filter的方法，它接受函数为一个参数
    //   //filter会对menuData进行遍历,根据true和FALSE来判断当前数据是否返回
    // },
    // 和有子菜单的
    // hasChildren() {
    //   return this.menuData.filter((item) => item.children);
    // },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  mounted() {
    console.log(this.menuData, 111);
  },
};
</script>
