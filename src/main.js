import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import './plugins/element.js'
import store from './store'
import validator from 'validator';
import axios from 'axios'
import * as echarts from "echarts";
// import "./api/mock"

// //配置请求的根路径，我之后在研究一下，在发起登录请求,因为看了有点问题，所以先注释掉看看
// axios.defaults.baseURL = 'http://192.168.189.198:8080/'
Vue.prototype.$http = axios
Vue.prototype.$validator = validator;
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
new Vue({
  router,
  store,//挂载
  render: h => h(App)
}).$mount('#app')


