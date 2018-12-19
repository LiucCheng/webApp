<template>
  <div class="chat_page">
    <ul v-if="contentList.length">
      <mt-cell-swipe v-for="(item, index) in contentList" :key="index"
        :title="item.title" :to="item.to"
        :label="item.label"
        :right="rightBtn"
      ><img slot="icon" src="../../../assets/me/i_01.png" width="24" height="24"></mt-cell-swipe>
    </ul>
    <ul v-else>
      <mt-cell title="添加聊天伙伴" @click.native="toFind"></mt-cell>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        contentList: [],
        rightBtn: [{
          content: '删除',
          style: {background: '#bb5a2b', color: '#fff', fontSize: '12px'},
          handler: (index) => this.$mint.MessageBox.confirm('你确定移除当前会话么?').then(action => {
              console.log('aaaaaaaa',action,index)
            })
        }]
      }
    },
    methods: {
      toFind() {
        this.$router.push({
          path: '/friends'
        })
      }
    },
    created() {
      let contentList = localStorage.getItem('contentList')
      let saveChatText = localStorage.getItem('saveChatText')
      if (contentList) {
        this.contentList = JSON.parse(contentList)
        if (saveChatText) {
          saveChatText = JSON.parse(saveChatText)
          for (let i = 0; i < this.contentList.length; i++) {
            if (saveChatText[this.contentList[i].friendUid]) {
              this.contentList[i].label = saveChatText[this.contentList[i].friendUid][saveChatText[this.contentList[i].friendUid].length - 1].text
            }
          }
          console.log(this.contentList)
        }
      }
    }
  }
</script>
<style scoped>
  .chat_page{
    margin-top: 44px;
  }
</style>
<style>
  .chat_page .mint-cell-label{
    padding-left: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }
</style>
