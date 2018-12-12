import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import detail from '@/page/detail/detail'
import contentList from '@/page/contentList/contentList'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: home,
      meta: {name: '首页',keepAlive: true}
    },{
      path: '/detail',
      component: detail,
      meta: {name: '详情',keepAlive: false}
    },{
      path: '/contentList',
      component: contentList,
      meta: {name: '分类列表',keepAlive: false}
    }
  ]
})
export default router
