<template>
  <div class="user_detail_page">
    <mt-header fixed title="详细信息">
      <mt-button slot="left" icon="back" @click="back()">返回</mt-button>
    </mt-header>
    <div class="user_info_cell" v-if="userData">
      <img :src="require('../../assets/me/i_01.png')"/>
      <div class="user_info_text">
        <div class="nick_name">{{userData.nickname}}</div>
        <div class="user_name">柳橙号：{{userData.username}}</div>
      </div>
    </div>
    <div class="submit_btn">
      <mt-button type="primary" size="large" @click.native="toSentMsgPage(userData.uid)">发消息</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        friendUid: '',
        userData: null
      }
    },
    methods: {
      toSentMsgPage(uid) {
        this.$router.push({
          path: '/chatting?friendUid=' + uid
        })
      },
      getData() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.post('/api/getUserInfo', {
          uid: localStorage.getItem('uid'),
          friend_uid: this.friendUid
        }).then((res) => {
          let msg = res.data
          this.$mint.Indicator.close()
          if (!msg.errcode) {
            this.userData = msg.data
          } else {
            this.$mint.Toast(msg.msg, 1000)
          }
        })
      },
      back() {
        this.$router.back()
      }
    },
    created() {
      this.friendUid = this.$route.query.friendUid
      this.getData()
    }
  }
</script>
<style scoped>
  @import "./userDetail.css";
</style>
