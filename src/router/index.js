import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Book from '../views/Book.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)
// 创建路由组件
//创建路由与组件进行映射
// 创建router实例
const routes = [
  //主路由
  // {
  //   path: '/', component: Login
  // },
  {
    path: '/',
    component: Main,
    redirect: '/login',//重定向
    children: [
      //子路由
      { path: 'home', component: Home }, //首页
      { path: 'user', component: User }, //用户管理
      { path: 'book', component: Book },//图书管理
      { path: 'book', component: Book },
      { path: 'Page1', component: PageOne },
      { path: 'Page2', component: PageTwo }
    ]
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  }


]

const router = new VueRouter({
  routes//是缩写，相当于routes：routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' || to.path === '/Register') {
//     // 接下来的函数
//     next();
//   } else {
//     //var会将作用域放大，let只是局部的作用域
//     let username = sessionStorage.getItem('username');
//     console.log(username)
//     //用户访问认证后页面时 必须校验用户信息是否存在，不存在去登陆页
//     if (username === null || username === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }

// })
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
// 将router文件暴露