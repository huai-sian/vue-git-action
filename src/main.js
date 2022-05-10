import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import jquery from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import quillEditor from 'vue-quill-editor'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { required, email } from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import Swal from 'sweetalert2'
import jwt from 'jwt-decode'
import jwtDecode from 'jwt-decode'

window.$ = jquery

Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(quillEditor)
Vue.component('Loading', Loading)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
localize('zh_TW', zhTW)

for (const rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhTW.messages[rule] // add its message
  })
};
configure({
  classes: {
    valid: 'valid',
    invalid: 'invalid'
  }
})
extend('required', {
  ...required,
  message: '此欄位不可為空'
})
extend('email', {
  ...email,
  message: '郵件地址不正確'
})

extend('username', {
  validate: value => {
    const regex = new RegExp("^[a-zA-Z0-9 ]+$")
    if(value.length < 6) {
      return false
    }
    return regex.test(value)
  },
  message: '請輸入6位以上字符的名稱'
})

extend('password', {
  validate: value => {
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])$")
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/.test(value)
  },
  message: '請輸入6位數以上的密碼(內含大小寫字母及數字)'
})

extend('password2', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: '密碼不一致'
});

extend('http', {
  validate: value => {
    return /(http(s?)):\/\//i.test(value)
  },
  message: '請輸入有效的連結'
});


Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth) {
    if (jwtDecode(JSON.parse(localStorage.getItem('userAuth'))).exp > Math.round(new Date().getTime()/1000)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  created() {
    // Google Sign-in initial
    
  },
  render: (h) => h(App),
}).$mount('#app');


