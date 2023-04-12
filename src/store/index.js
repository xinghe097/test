import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
//全局引入Vuex
Vue.use(Vuex)

//创建vuex的实例
//接收一个对象，包含了之前vuex的组件
//将实例暴露在外面
export default new Vuex.Store(
    {
        modules: {
            tab
        }
    }
)