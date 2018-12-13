<template>
  <div class="login_cell">
    <span class="name">{{title}}</span>
    <span class="value"><input :type="lcType" :placeholder="placeholder" v-model="inputText"/></span>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'lc-login-cell',
    props: {
      title: {
        type: String,
        default: '用户名'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      'lc-model': {
        type: [String, Number],
        default: ''
      },
      lcType: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        inputText: this['lc-model']
      }
    },
    watch: {
      inputText(newVal) {
        this.$emit('lcInput', newVal)
      }
    }
  }
</script>
<style scoped>
  .login_cell{
    height: 45px;
    background: #fff;
    padding: 0 10px;
    border-bottom: 1Px solid #eee;
    line-height: 44px;
  }
  .login_cell .name{
    float: left;
    width: 30%;
  }
  .login_cell .value{
    float: left;
    width: 70%;
    position: relative;
  }
  .login_cell .value input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
  }
</style>
