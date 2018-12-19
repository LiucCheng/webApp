<template>
  <div id="app">
    <keep-alive v-if="isKeepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
        isKeepAlive: true
      }
    },
    watch: {
      $route(to ,from, next) {
        this.isKeepAlive = to.meta.keepAlive
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
