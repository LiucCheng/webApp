/**
 * Created by Administrator on 2018/12/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    title: '首页'
  },
  mutations: {
    titleM(state, str) {
      state.title = str
    },
    '<MUTATION_PREFIX><EVENT_NAME>'() {
      console.log('-----mutations-----')
    }
  },
  actions: {
    '<ACTION_PREFIX><EVENT_NAME>'() {
      // do something
      console.log('----actions------')
    }
  }
})
export default store
