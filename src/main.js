import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, LoadingBar } from 'iview'
import 'iview/dist/styles/iview.css'
import { getLocalStorage } from './util/localStorage'

Vue.config.productionTip = false;

//结合vue-axios全局使用axios
Vue.use(VueAxios, axios);

//在 request 拦截器实现
axios.interceptors.request.use(config => {
  LoadingBar.start();
  // config.baseURL = 'http://localhost:8090'
  // config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
  // config.timeout = 6000;
  // let token = sessionStorage.getItem('access_token')
  // if (token) {
  //   config.headers = {
  //     'access-token': token,
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // }
  // if (config.url === 'refresh') {
  //   config.headers = {
  //     'refresh-token': sessionStorage.getItem('refresh_token'),
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // }
  return config;
}, err => {
  LoadingBar.error();
  return Promise.reject(err);
});
//在 response 拦截器实现
axios.interceptors.response.use(response => {
  LoadingBar.finish();
  // 定时刷新access-token
  // if (!response.data.value && response.data.data.message === 'token invalid') {
  //   //刷新token
  //   store.dispatch('refresh').then(response => {
  //     sessionStorage.setItem('access_token', response.data)
  //   }).catch(error => {
  //     throw new Error('token刷新' + error)
  //   })
  // }
  return response;
}, err => {
  LoadingBar.error();
  return Promise.reject(err);
});

//全局组件
Vue.component('Button', Button);

//路由切换 显示进度条
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  const token = getLocalStorage('access_token');
  if (to.path !== '/login' && !token) {
    router.push('/login');
  }
  next();
});
router.afterEach(() => {
  LoadingBar.finish();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
