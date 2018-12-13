<template>
  <div class="chatting_page">
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <ul class="chatting_content" ref="chatBox">
      <li class="other_sent">我就是我</li>
      <li class="me_sent">我是谁</li>
    </ul>
    <div class="sent_box" ref="sentBox">
      <textarea v-model="inputSentText" @input="inputT" ref="inputArea"></textarea>
      <span class="sent_btn" @click="sentMessage">发送</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '西门崔雪',
        inputSentText: '不服气'
      }
    },
    methods: {
      inputT() {
        this.$refs.sentBox.style.maxHeight = '100px'
        this.$refs.inputArea.style.maxHeight = '100px'
        if (this.$refs.inputArea.scrollHeight < 100) {
          this.$refs.sentBox.style.height = this.$refs.inputArea.scrollHeight + 'px'
          this.$refs.inputArea.style.height = this.$refs.inputArea.scrollHeight + 'px'
          this.$refs.chatBox.style.bottom = this.$refs.inputArea.scrollHeight + 3 + 'px'
        }
        console.log(this.$refs.inputArea.scrollHeight,this.$refs.inputArea.cols)
        // this.$refs.inputArea.style.height = (this.$refs.inputArea.scrollHeight) + 'px'
      },
      sentMessage() {
      }
    }
  }
</script>
<style scoped>
  .chatting_page{
    margin-top: 44px;
  }
  .chatting_content{
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    bottom: 46px;
    background: #fff;
    padding: 10px;
  }
  .sent_box{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .sent_box textarea{
    resize: none;
    border: none;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 44px;
    height: 44px;
    width: 80%;
    padding: 10px 10px;
    font-size: 20px;
  }
  .sent_btn{
    position: absolute;
    right: 2%;
    bottom: 0;
    width: 18%;
    height: 44px;
    border-radius: 4px;
    background: #1aad19;
    color: #fff;
    text-align: center;
    line-height: 44px;
  }
</style>
