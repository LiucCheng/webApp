import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import chat from '@/page/home/chat/chat'
import chatting from '@/page/chatting/chatting'
import goods from '@/page/home/goods/goods'
import found from '@/page/home/found/found'
import me from '@/page/home/me/me'

import detail from '@/page/detail/detail'
import register from '@/page/register/register'
import contentList from '@/page/contentList/contentList'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'chat',
      redirect: '/chat',
      component: home,
      children: [{
        path: 'chat',
        component: chat,
        meta: {name: '聊天',keepAlive: true}
      },{
        path: 'goods',
        component: goods,
        meta: {name: '趣闻',keepAlive: true}
      },{
        path: 'found',
        component: found,
        meta: {name: '贡献',keepAlive: true}
      },{
        path: 'me',
        component: me,
        meta: {name: '我的',keepAlive: true}
      }]
    },{
      path: '/chatting',
      component: chatting,
      meta: {name: '聊天',keepAlive: false}
    },{
      path: '/register',
      component: register,
      meta: {name: '注册',keepAlive: false}
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
