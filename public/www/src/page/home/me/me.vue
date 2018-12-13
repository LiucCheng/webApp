<template>
  <div class="me_page">
    <lc-login-cell title="账号" placeholder="请输入登录账号" :lc-model="account" @lcInput="accountInput"></lc-login-cell>
    <lc-login-cell title="密码" placeholder="请输入登录密码" :lc-model="pwd" @lcInput="pwdInput"
                   lcType="password"></lc-login-cell>
    <div class="submit_btn">
      <mt-button type="primary" size="large" :disabled="registerD" @click.native="login">登录</mt-button>
    </div>
    <div class="to_register" @click="toRegister">
      <span>我还没有账号，立即注册</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        account: '',
        pwd: '',
        registerD: true
      }
    },
    methods: {
      checkBtn() {
        if (this.account && this.pwd) {
          this.registerD = false
        } else {
          this.registerD = true
        }
      },
      accountInput(value) {
        this.account = value
        this.checkBtn()
      },
      pwdInput(value) {
        this.pwd = value
        this.checkBtn()
      },
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      login() {
      }
    }
  }
</script>
<style scoped>
  .me_page{
    margin-top: 44px;
  }
  .me_page .submit_btn{
    margin-top: 40px;
    padding: 0 10px;
  }
  .me_page .to_register{
    margin-top: 10px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    padding: 0 10px;
    color: #666;
  }
</style>
