/**
 * Created by Administrator on 2018/12/10.
 */
import collectionComponent from './collection.vue'

let comlection = {
  install: function (Vue) {
    Vue.component('collection', collectionComponent)
  }
}
export default comlection
