<template>
  <div class="me_page">
    <div v-if="!isLogin">
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
    <div v-else>
      <mt-cell title="账号" :value="userInfo.username">
        <img slot="icon" src="../../../assets/me/i_01.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="昵称" :value="userInfo.nickname"></mt-cell>
      <div class="submit_btn">
        <mt-button type="default" size="large" @click.native="loginOut">退出登录</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLogin: localStorage.getItem('uid') || false,
        account: '',
        pwd: '',
        registerD: true,
        userInfo: ''
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
        this.$ajax.post('/api/login', {
          username: this.account,
          pwd: this.pwd
        }).then(res => {
          let msg = res.data
          if (!msg.errcode) {
            localStorage.setItem('userInfo', JSON.stringify(msg.data))
            localStorage.setItem('uid', msg.data.uid)
            this.userInfo = msg.data
            this.isLogin = true
          } else {
            this.$mint.Toast({message: msg.msg, duration: 1000})
          }
        })
      },
      loginOut() {
        this.$mint.MessageBox.confirm('确定退出登录么?').then(action => {
          // this.$ajax.post('/api/loginOut')
          this.userInfo = null
          this.isLogin = false
          localStorage.removeItem('userInfo')
          localStorage.removeItem('uid')
        })
      }
    },
    created() {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
