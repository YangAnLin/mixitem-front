import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import moment from 'moment'

// ant design and import
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

// axios
Vue.prototype.$axios = axios

// 时间过滤器
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
