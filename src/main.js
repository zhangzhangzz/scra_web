/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-12-23 20:18:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\main.js
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
//axios.defaults.headers.common['token'] = "1233333333" // 在header中添加token
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.headers.post['Content-Type']='application/json'
Vue.use(VueAxios, axios)

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import App from './App'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import '@/styles/index.scss' // global css
import './assets/scss/global.scss' // 自定义全局的scss
import Methods from './assets/js/global.js' // 自定义全局的js
import BaiduMap from 'vue-baidu-map'
import './assets/js/rem.js'
import store from './store'
import router from './router'
Vue.prototype.$mod = Methods
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
import utilDirecitve from './assets/js/directive'
Vue.directive('clickOutside', utilDirecitve)

Vue.prototype.$base64Img = (file)=>{
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: '4Y7MWSyVlaLMavP2Zx8nz4H3IOp1KLid'
})

window.that = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
