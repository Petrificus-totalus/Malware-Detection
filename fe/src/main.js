import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import axios from "axios";
import qs from "qs";
import store from "./store";
import "./assets/fonts/iconfont.css";
const echarts = require("echarts");
Vue.prototype.$echarts = echarts;

// 默认会找 Filters/index.js
import * as filters from "./filters/";

// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

//配置请求头
// axios.defaults.headers = {
//   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
// };

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.defaults.baseURL = "/api";
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
