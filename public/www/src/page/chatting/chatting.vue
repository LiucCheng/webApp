<template>
  <div class="chatting_page">
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="chatBox" class="chatting_content" ref="chatBox" >
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                   topPullText="查看更早记录" topDropText="释放加载" style="color: #fff;">
        <ul ref="scrollHeight">
          <li v-for="(item, index) in messageSent" :key="index" :class="item.isMe ? 'me_sent' : 'other_sent'">
            <span class="icon"></span><div>{{item.text}}</div>
          </li>
          <!--<div>{{timeShow}}</div>-->
        </ul>
      </mt-loadmore>
    </div>
    <div id="sentBox" class="sent_box" ref="sentBox">
      <textarea v-model="inputSentText" @input="inputT" ref="inputArea"></textarea>
      <span class="sent_btn" @click="sentMessage">发送</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        timeShow: '',
        messageSent: [
          {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true}, {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true},
          {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true}, {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true},
          {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true}, {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true},
          {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true}, {text: '他是谁', isMe: false}, {text: '我是谁', isMe: true}
          ],
        title: '西门崔雪',
        inputSentText: '不服气',
        isMe: true,
        topStatus: ''
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

      handleTopChange(status) {
        this.topStatus = status
        console.log(status)
      },
      loadTop() {
        // 加载更多数据
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
        },1000)
      },
      sentMessage() {
        let text = this.inputSentText
        if (!text) {
          return
        }
        if (this.isMe) {
          this.messageSent.push({text: text,isMe: this.isMe})
        } else {
          this.messageSent.push({text: text,isMe: this.isMe})
        }
        this.isMe = !this.isMe
        this.inputSentText = ''
        setTimeout(() => {
          this.scrollTopEl()
        },100)
      },
      scrollTopEl() {
        let container = document.getElementById('chatBox')
        let scrollHeight = this.$refs.scrollHeight.offsetHeight
        console.log(scrollHeight)
        container.scrollTop = scrollHeight
      }
    },
    created() {
      // this.timeShow = this.$common.formatDate(Date.now())
      // console.log(this.$common.formatDate(Date.now()))
      // this.$refs.chatBox.scrollHeight
    },
    mounted() {
      this.scrollTopEl()
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
  .chatting_content .other_sent{
    position: relative;
  }
  .chatting_content .other_sent div{
    color: #333;
    float: left;
    max-width: 85%;
    background: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 40px;
  }
  .chatting_content .other_sent .icon{
    float: left;
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
  }
  .chatting_content .other_sent div::after{
    content: ' ';
    position: absolute;
    left: -8px;
    width: 3px;
    bottom: 10px;
    border-width: 12px;
    border-right:10px solid transparent;
    border-left:10px solid transparent;
    border-top:10px solid transparent;
    border-bottom:10px solid #fff;
  }
  .chatting_content .me_sent div{
    color: #000;
    float: right;
    max-width: 85%;
    background: #1aad19;
    padding: 6px 10px;
    border-radius: 4px;
    position: relative;
    margin-right: 40px;
  }
  .chatting_content .me_sent{
    position: relative;
  }
  .chatting_content .me_sent .icon{
    float: right;
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .chatting_content .me_sent div::after{
    content: ' ';
    position: absolute;
    right: -8px;
    bottom: 10px;
    width: 3px;
    border-width: 12px;
    border-right:10px solid transparent;
    border-left:10px solid transparent;
    border-top:10px solid transparent;
    border-bottom:10px solid #1aad19;
  }
</style>
