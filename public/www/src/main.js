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

// 自定义组件
import LCUI from '@/components/lc-ui'

// css
import './commonCSS/base.css'

// 组件
import navigation from './components/navigation'
import collection from './components/collection'

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
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
