import Vue from 'vue'
import App from './App'
// 导入uView
import uView from "uview-ui";
import http from './common/api/http/index.js';
// 请求接口http
Vue.prototype.$http = http

Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
