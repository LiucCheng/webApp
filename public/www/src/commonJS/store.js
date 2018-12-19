/**
 * Created by Administrator on 2018/12/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    title: '首页',
    isSubscribe: false,
    chatTextData: {}
  },
  getters: {
    not_connectStatus(state) {
      return !state.connectStatus
    }
  },
  mutations: {
    titleM(state, str) {
      state.title = str
    },
    isSubscribeM(state) {
      state.connectStatus = true
    },
    chatTextDataM(state, data) {
      console.log(data,'09090909')
      state.chatTextData = data
    }
  },
  actions: {
    chatTextDataA({state, commit}, self) {
      // do something
      let subScribeType = localStorage.getItem('uid')
      if (!state.isSubscribe) {
        self.sockets.subscribe(subScribeType, (msg) => {
          console.log(state.chatTextData,'888888')
          commit('isSubscribeM')
          commit('chatTextDataM', msg)
        })
      }
    }
  }
})
export default store
