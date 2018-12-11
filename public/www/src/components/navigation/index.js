/**
 * Created by Administrator on 2018/12/7.
 */
import navigationComponent from './navigation.vue'
const navigation = {
  install: function (Vue) {
    Vue.component('navigation', navigationComponent)
  }
}
export default navigation
