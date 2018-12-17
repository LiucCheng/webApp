<template>
  <div class="add_friend_page">
    <mt-header fixed title="添加好友">
      <mt-button @click="clickBack" slot="left" icon="back">返回</mt-button>
    </mt-header>
    <lc-search-bar :autofocus="true" @searchEvent="searchBtn"></lc-search-bar>
    <ul class="search_friend" v-if="isShow">
      <li class="no_data">该账号还未注册，赶快联系好友注册一个吧</li>
    </ul>
    <div class="search_friend" v-else>
      <mt-cell :title="searchList.name"></mt-cell>
    </div>
    <div class="submit_btn" v-if="searchList.name">
      <mt-button size="large" type="primary" @click="addOrSendMsg">{{submitText}}</mt-button>
    </div>
  </div>
</template>
<script>
  import MtButton from '../../../node_modules/mint-ui/packages/button/src/button'
  export default {
    components: {MtButton},
    data() {
      return {
        value: '',
        submitText: '添加到通讯录',
        isShow: false,
        searchList: {
          name: ''
        },
        friendData: null
      }
    },
    methods: {
      clickBack() {
        this.$router.back()
      },
      searchBtn(val) {
        this.$mint.Indicator.open('加载中')
        this.$ajax.post('/api/findFriends', {
          uid: localStorage.getItem('uid'),
          friends_user_name: val
        }).then(res => {
          let msg = res.data
          this.$mint.Indicator.close()
          if (!msg.errcode) {
            // 还未添加好友，但对方已经注册了的
            this.isShow = false
            this.submitText = '添加到通讯录'
            this.searchList.name = msg.data.nickname
            this.friendData = msg.data
          } else if (msg.errcode === 10001) {
            // 已经是朋友
            this.isShow = false
            this.submitText = '发消息'
            this.searchList.name = msg.data.nickname
            this.friendData = msg.data
          } else if (msg.errcode === 10000) {
            // 还未注册
            this.isShow = true
            this.friendData = null
          }
        })
      },
      addOrSendMsg() {
        if (this.submitText === '发消息') {
          // 跳转聊天界面
          this.$router.push({
            path: '/chatting',
            query: {
              fUsername: this.friendData.username,
              fUid: this.friendData.uid
            }
          })
        } else {
          this.$ajax.post('/api/addFriends', {
            uid: localStorage.getItem('uid') || '',
            friends_user_name: this.friendData.username,
            friends_uid: this.friendData.uid
          }).then(res => {
            let msg = res.data
            if (!msg.errcode) {
              this.$mint.Toast('添加成功，即将返回上一界面', 1500)
              setTimeout(() => {
                this.$router.back()
              },1500)
            } else {
              this.$mint.Toast(msg.msg, 1000)
            }
            console.log(msg)
          })
        }
      }
    }
  }
</script>
<style scoped>
  .add_friend_page {
    padding-top: 40px;
  }

  .search_friend {
    padding-top: 41px;
  }

  .no_data {
    text-align: center;
    padding: 10px 0;
    color: #999;
    background: #fff;
  }

  .submit_btn {
    margin: 40px 20px;
  }
</style>
