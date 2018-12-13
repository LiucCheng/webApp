/**
 * Created by Administrator on 2018/12/12.
 */
import lcLoginCell from './loginCell/lcLoginCell.vue'
import lcTab from './lcTab/lcTab.vue'

const install = function(Vue) {
  if (install.installed) return
  Vue.component(lcLoginCell.name, lcLoginCell)
  Vue.component(lcTab.name, lcTab)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  lcLoginCell,
  lcTab
}
