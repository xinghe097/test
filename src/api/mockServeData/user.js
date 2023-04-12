// import Mock from "mockjs"


// function param2Obj(url) {
//     const search = url.split('?')[1]
//     if (!search) {
//         return {}
//     }
//     return JSON.parse(
//         "{'" +
//         decodeURIComponent(search)
//             .replace(/"/g, "\\'")
//             .replace(/&/g, "','")
//             .replace(/"/g, "':'") +
//         "'}"

//     )
// }
// let List = []
// const count = 200

// for (let i = 0; i < count; i++) {
//     List.push(
//         Mock.mock({
//             username: Mock.Random.guid(),
//             name: Mock.Random.cname(),
//             age: Mock.Random.integer(16, 40),
//             sex: Mock.Random.integer(0, 1),
//             telephone: Mock.Random.integer(13284358951, 15832211845)
//         })
//     )
// }

// export default {
//     getUserList: config => {
//         console.log(config, 'config')
//         const { name, page = 1, limit = 20 } = param2Obj(config.url)
//         console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
//         const mockList = List.filter(user => {
//             if (name && user.name.indexOf(name) === -1 && user.username.indexOf(name) === -1) return false
//             return true
//         })
//         const pageList = mockList.filter(
//             (item, index) => index < limit * page && index >= limit * (page - 1)
//         )
//         return {
//             code: 20000,
//             count: mockList.length,
//             list: pageList
//         }
//     },
//     CreateUser: config => {
//         const { username, name, age, sex, telephone } = JSON.parse(config.body)
//         console.log(JSON.parse(config.body))
//         List.unshift({
//             username: Mock.Random.guid(),
//             name: name,
//             age: age,
//             sex: sex,
//             telephone: telephone
//         })
//         return {
//             code: 20000,
//             data: {
//                 message: "添加成功"
//             }
//         }
//     },
//     deleteUser: config => {
//         const { username } = JSON.parse(config.body)
//         if (!username) {
//             return {
//                 code: -999,
//                 message: "参数不正确"
//             }
//         }
//         else {
//             List = List.filter(u => u.username !== username)
//             return {
//                 code: 20000,
//                 message: "删除成功"
//             }
//         }
//     },
//     batchremove: config => {
//         let { usernames } = param2Obj(config.url)
//         usernames = usernames.split(',')
//         List = List.filter(u => !usernames.includes(u.usernames))
//         return {
//             code: 20000,
//             data: {
//                 message: "批量删除成功"
//             }
//         }
//     },
//     updateUser: config => {
//         const { username, name, age, sex, telephone } = JSON.parse(config.body)
//         const sex_num = parseInt(sex)
//         List.some(u => {
//             if (u.username === username) {
//                 u.name = name
//                 u.age = age
//                 u.sex = sex
//                 u.telephone = telephone
//                 return true
//             }
//         })
//         return {
//             code: 20000,
//             data: {
//                 message: "编辑成功"
//             }
//         }
//     }

// }