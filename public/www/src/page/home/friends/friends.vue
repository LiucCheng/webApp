<!--通讯录-->
<template>
  <div class="goods_page">
    <mt-cell v-for="(item, index) in friendList" :key="index"
             :title="'昵称：' + item.account.nickname" :label="'账号：' + item.account.username"
             @click.native="userDetail(item.account.uid)"
    ></mt-cell>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        friendList: [],
        isLoading: false
      }
    },
    methods: {
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
        }, 2000)
      },
      loadBottom() {
        // 加载更多数据
        if (this.count >= 10) {
          this.allLoaded = true
        }
        setTimeout(() => {
          this.count++
          this.$refs.loadmore.onBottomLoaded()
        }, 2000)
      },
      getData() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.post('/api/getFriendList',{
          uid: localStorage.getItem('uid') || ''
        }).then(res => {
          this.$mint.Indicator.close()
          let msg = res.data
          if (!msg.errcode) {
            this.friendList = msg.data
            this.isLoading = true
          } else {
            this.$mint.Toast(msg.msg, 1000)
          }
        })
      },
      userDetail(uid) {
        this.$router.push({
          path: '/userDetail?friendUid=' + uid
        })
      }
    },
    created() {
      this.getData()
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .goods_page {
    position: fixed;
    top: 40px;
    bottom: 39px;
    left: 0;
    width: 100%;
    /*margin-top: 44px;*/
    /*margin-bottom: 60px;*/
  }
</style>
<style>
  .mint-indexlist-nav{
    bottom: 39px;
  }
  .mint-indexsection-index{
    background: #f2f2f2;
  }
</style>
