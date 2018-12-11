/**
 * Created by Administrator on 2018/12/7.
 */
import Vue from 'vue'
Vue.prototype.flex = function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var docEl = document.documentElement
  function refresh () {
    // ratina px
    var width = docEl.getBoundingClientRect().width,
      rem = width / 7.5
    docEl.style.fontSize = rem + 'px'
  }
  window.addEventListener(resizeEvt, function () {
    refresh()
  }, false)
  window.addEventListener('load', function() {
    refresh()
  }, false)
}
// 1rem = 100px 计量
Vue.prototype.flex()
