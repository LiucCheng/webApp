import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import detail from '@/page/detail/detail'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {name: '首页'}
    },{
      path: '/detail',
      component: detail,
      meta: {name: '详情'}
    }
  ]
})
export default router
