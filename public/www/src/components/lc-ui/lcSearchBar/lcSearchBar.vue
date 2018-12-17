<template>
  <div class="lc_search_bar">
    <input :placeholder="placeholder" ref="input" v-model="value"/>
    <button class="search_btn" @click="searchBack">搜索</button>
  </div>
</template>
<script>
  export default {
    name: 'lc-search-bar',
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      },
      autofocus: Boolean
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      searchBack() {
        if (!this.value) {
          this.$mint.Toast('请输入好友的账号', 1000)
          return
        }
        this.$emit('searchEvent', this.value)
      }
    },
    mounted() {
      this.autofocus && this.$refs.input.focus()
    }
  }
</script>
<style scoped>
  .lc_search_bar{
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    height: 41px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    z-index: 999;
  }
  .lc_search_bar input{
    float: left;
    padding-left: 10px;
    width: 80%;
    height: 100%;
  }
  .lc_search_bar .search_btn{
    float: right;
    width: 15%;
    text-align: center;
    background: #4caf50;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    margin-right: 5px;
    color: #fff;
    border-radius: 4px;
  }
</style>
