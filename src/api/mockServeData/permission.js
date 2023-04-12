// import Mock from 'mockjs'


// export default {
//     getMenu: config => {
//         const { username, password } = JSON.parse(config.body)
//         if (username === 'admin' && password === 'admin') {
//             return {
//                 code: 2000,
//                 data: {
//                     menu: [
//                         {
//                             path: "/",
//                             name: "home",
//                             label: "首页",
//                             icon: "s-home",
//                             url: "Home/Home",
//                         },
//                         {
//                             path: "/book",
//                             name: "book",
//                             label: "图书管理",
//                             icon: "reading",
//                             url: "BookManage/BookManage",
//                         },
//                         {
//                             path: "/user",
//                             name: "user",
//                             label: "用户管理",
//                             icon: "s-custom",
//                             url: "UserManage/UserManage",
//                         },
//                         {
//                             label: "其他",
//                             icon: "location",
//                             //   这是子栏里的内容
//                             children: [
//                                 {
//                                     path: "/page1",
//                                     name: "page1",
//                                     label: "页面1",
//                                     icon: "setting",
//                                     url: "Other/PageOne",
//                                 },
//                                 {
//                                     path: "/page2",
//                                     name: "page2",
//                                     label: "页面2",
//                                     icon: "setting",
//                                     url: "Other/PageTwo",
//                                 },
//                             ],
//                         },
//                     ],
//                     token: Mock.Random.guid(),
//                     message: "获取成功"
//                 }
//             }
//         } else if (username === 'xinghe' && password === 'xinghe') {
//             return {
//                 code: 20000,
//                 data: {
//                     menu: [
//                         {
//                             path: "/",
//                             name: "home",
//                             label: "首页",
//                             icon: "s-home",
//                             url: "Home/Home",
//                         },
//                         {
//                             path: "/book",
//                             name: "book",
//                             label: "图书管理",
//                             icon: "reading",
//                             url: "BookManage/BookManage",
//                         },
//                         {
//                             path: "/user",
//                             name: "user",
//                             label: "用户管理",
//                             icon: "s-custom",
//                             url: "UserManage/UserManage",
//                         },
//                         {
//                             label: "其他",
//                             icon: "location",
//                             //   这是子栏里的内容
//                             children: [
//                                 {
//                                     path: "/page1",
//                                     name: "page1",
//                                     label: "页面1",
//                                     icon: "setting",
//                                     url: "Other/PageOne",
//                                 },
//                                 {
//                                     path: "/page2",
//                                     name: "page2",
//                                     label: "页面2",
//                                     icon: "setting",
//                                     url: "Other/PageTwo",
//                                 },
//                             ],
//                         },
//                     ]
//                 }
//             }
//         }
//         else {
//             return {
//                 code: -999,
//                 data: {
//                     message: '密码错误'
//                 }
//             }
//         }
//     }
// }