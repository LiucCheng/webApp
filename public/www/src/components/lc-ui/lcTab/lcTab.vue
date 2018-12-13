<template>
  <ul class="lc_footer">
    <router-link :replace="replace" tag="li" v-for="(item, index) in list" :key="index" :to="item.to">{{item.title}}</router-link>
  </ul>
</template>
<script>
  export default {
    name: 'lc-tab',
    props: {
      list: {
        type: Array
      },
      replace: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    }
  }
</script>
<style scoped>
  .lc_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #fff;
    display: flex;
    z-index: 999;
    text-align: center;
  }
  .lc_footer li{
    flex: 1;
    font-size: 16px;
  }
  .lc_footer li.router-link-active{
    color: #0d88e5;
  }
</style>
