/**
 * Created by Administrator on 2018/12/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let install = false
function saveChatText(friendUid, data) {
  // 缓存聊天记录
  let saveChat = localStorage.getItem('saveChatText')
  if (data) {
    if (saveChat) {
      saveChat = JSON.parse(saveChat)
      if (saveChat[friendUid]) {
        saveChat[friendUid].push(data)
      } else {
        saveChat[friendUid] = []
        saveChat[friendUid].push(data)
      }
    } else {
      saveChat = {}
      saveChat[friendUid] = []
      saveChat[friendUid].push(data)
    }
    localStorage.setItem('saveChatText', JSON.stringify(saveChat))
  } else {
    if (saveChat) {
      saveChat = JSON.parse(saveChat)
      return saveChat[friendUid]
    } else {
      return null
    }
  }
}
const store = new Vuex.Store({
  state: {
    title: '首页',
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
    chatTextDataM(state, data) {
      state.chatTextData = data
    }
  },
  actions: {
    chatTextDataA({state, commit}, self) {
      // do something
      let subScribeType = localStorage.getItem('uid')
      if (!install) {
        self.sockets.subscribe(subScribeType, (msg) => {
          saveChatText(msg.fronUid, {text: msg.text, isMe: false})
          install = true
          commit('chatTextDataM', msg)
        })
      }
    }
  }
})
export default store
