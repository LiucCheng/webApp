// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './commonJS/fix'
import commonJS from './commonJS/common'
import MintUI from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import store from './commonJS/store'

// 自定义组件
import LCUI from '@/components/lc-ui'

// css
import './commonCSS/base.css'

// 组件
import navigation from './components/navigation'
import collection from './components/collection'

// socket.io
import VueSocketIO from 'vue-socket.io'
let io = new VueSocketIO({
  debug: false,
  connection: 'http://localhost:8889',
  id: '008',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
Vue.use(io)
Vue.use(navigation)
Vue.use(collection)

// mint-ui框架
Vue.use(MintUI)

// 自定义组件引入
Vue.use(LCUI)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$mint = MintUI
Vue.prototype.$common = commonJS

/* eslint-disable no-new */
new Vue({
  sockets: {
    connect: function () {
      console.log('socket connected', this.$socket.id)
      if (localStorage.getItem('uid')) {
        this.$socket.emit('saveUserData', {
          uid: localStorage.getItem('uid'),
          _socketID: this.$socket.id
        })
      }
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)', data)
    }
  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', data)
    }
  },
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
