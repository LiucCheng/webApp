<template>
  <div class="nav">
    <span class="back" v-if="!hideBack" @click="navBack">返回</span>
    {{title}}
  </div>
</template>
<script>
  export default {
    name: 'navigation',
    props: {
      title: {
        type: String,
        default: '首页'
      },
      hideBack: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      navBack() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 88px;
    background: lightslategrey;
    font-size: 34px;
    color: #fff;
    text-align: center;
    line-height: 88px;
    padding: 0 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .back{
    position: absolute;
    left: .2rem;
    height: 100%;
    width: 1rem;
    font-size: .28rem;
    text-align: left;
  }
</style>
