<template>
  <div class="register_page">
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <lc-login-cell title="登录账号" placeholder="请输入登录账号" :lc-model="account" @lcInput="accountInput"></lc-login-cell>
    <lc-login-cell title="昵称" placeholder="请输入密码" :lc-model="pwd" @lcInput="pwdInput"
                   lcType="password"></lc-login-cell>
    <lc-login-cell title="设置密码" placeholder="请输入密码" :lc-model="pwd" @lcInput="pwdInput"
                   lcType="password"></lc-login-cell>
    <lc-login-cell title="确认密码" placeholder="请输入密码" :lc-model="pwdSure" @lcInput="pwdSureInput"
                   lcType="password"></lc-login-cell>
    <div class="submit_btn">
      <mt-button type="primary" size="large" :disabled="registerD" @click.native="registerAccount">注册</mt-button>
    </div>
    <div class="tip">
      温馨提示：登录账号只支持英文或数字
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        account: '',
        pwd: '',
        pwdSure: '',
        registerD: true
      }
    },
    methods: {
      checkBtn() {
        if (this.account && this.pwd && this.pwdSure) {
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
      pwdSureInput(value) {
        this.pwdSure = value
        this.checkBtn()
      },
      registerAccount() {
        if (this.pwd !== this.pwdSure) {
          this.$mint.Toast({message: '密码两次输入不一样', duration: 1000})
          return
        }
        this.$ajax.post('/api/register', {
          account: this.account,
          pwd: this.pwd
        }).then(res => {
          this.$mint.Indicator.close()
          let msg = res.data
          if (!msg.errcode) {
            this.titleList = msg.data
            for (let i = 0; i < msg.data.length; i++) {
              this.slots[0].values.push(msg.data[i].title)
            }
          } else {
            this.$mint.Toast({message: msg.msg, duration: 1000})
          }
        })
      }
    }
  }
</script>
<style scoped>
  .register_page{
    margin-top: 44px;
  }
  .register_page .submit_btn{
    margin-top: 40px;
    padding: 0 10px;
  }
  .register_page .tip{
    padding: 10px;
    color: #999;
    font-size: 14px;
  }
</style>
