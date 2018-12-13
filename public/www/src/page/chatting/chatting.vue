<template>
  <div class="chatting_page">
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <ul class="chatting_content" ref="chatBox">
      <li class="other_sent" v-for="i in 10" :key="i">
        <div>我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是我是</div>
      </li>
      <li class="me_sent">
        <div>你爸</div>
      </li>
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
    background: #2b2b2b;
    padding: 10px;
    overflow: auto;
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
  .chatting_content li{
    overflow: hidden;
  }
  .chatting_content li:last-child{
    margin-bottom: 20px;
  }
  .chatting_content li + li{
    margin-top: 10px;
  }
  .chatting_content .other_sent div{
    color: #333;
    float: left;
    max-width: 90%;
    background: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 10px;
  }
  .chatting_content .other_sent div:after{
    content: ' ';
    position: absolute;
    top: -20px;
    right: 20px;
    border-width: 12px;
    border-right:10px solid transparent;
    border-left:10px solid transparent;
    border-top:10px solid transparent;
    border-bottom:10px solid #fff;
  }
  .chatting_content .me_sent div{
    color: #333;
    float: right;
    max-width: 90%;
    background: #1aad19;
    padding: 6px 10px;
    border-radius: 4px;
  }
</style>
