<template>
  <div class="chat_page">
    <ul>
      <mt-cell-swipe v-for="(item, index) in contentList" :key="index"
        :title="item.title" :to="item.to"
        :label="item.lable"
        :right="rightBtn"
      ></mt-cell-swipe>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        contentList: [{
          title: '西门吹雪',
          lable: '我的天啊',
          to: '/chatting'
        },{
          title: '西门吹雪',
          lable: '我的天啊',
          to: '/chatting'
        }],
        rightBtn: [{
          content: '删除',
          style: {background: '#bb5a2b', color: '#fff', fontSize: '12px'},
          handler: (index) => this.$mint.MessageBox.confirm('你确定移除当前会话么?').then(action => {
              console.log('aaaaaaaa',action,index)
            })
        }]
      }
    },
    created() {
    }
  }
</script>
<style scoped>
  .chat_page{
    margin-top: 44px;
  }
</style>
