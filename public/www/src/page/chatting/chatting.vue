<template>
  <div class="chatting_page">
    <mt-header fixed :title="title">
      <router-link to="/chat" redirect="/chat" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="chatBox" class="chatting_content" ref="chatBox" >
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                   :autoFill="false"
                   topPullText="查看更早记录" topDropText="释放加载" style="color: #fff;">
        <ul ref="scrollHeight">
          <li v-for="(item, index) in messageSent" :key="index" :class="item.isMe ? 'me_sent' : 'other_sent'">
            <span class="icon"></span><div>{{item.text}}</div>
          </li>
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
        messageSent: [],
        title: '',
        inputSentText: '',
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
        this.inputSentText = ''
        this.$socket.emit('msg', {
          uid: localStorage.getItem('uid'),
          toUid: this.$route.query.friendUid,
          text
        })
        this.dataOpe('', text)
        this.saveChatText({text: text,isMe: true})
        setTimeout(() => {
          this.scrollTopEl()
        },100)
      },
      scrollTopEl() {
        let container = document.getElementById('chatBox')
        let scrollHeight = this.$refs.scrollHeight.offsetHeight
        container.scrollTop = scrollHeight
      },
      saveChatText(data) {
        // 缓存聊天记录
        let friendUid = this.$route.query.friendUid
        let saveChat = localStorage.getItem('saveChatText')
        if (data) {
          if (saveChat) {
            saveChat = JSON.parse(saveChat)
            if (saveChat[friendUid]) {
              saveChat[friendUid].push(data)
            } else {
              saveChat[friendUid] = []
              saveChat[friendUid].push(data)
            }
          } else {
            saveChat = {}
            saveChat[friendUid] = []
            saveChat[friendUid].push(data)
          }
          this.messageSent = saveChat[friendUid]
          localStorage.setItem('saveChatText', JSON.stringify(saveChat))
        } else {
          if (saveChat) {
            saveChat = JSON.parse(saveChat)
            return saveChat[friendUid]
          } else {
            return null
          }
        }
      },
      dataOpe(msg, text) {
        // 上一聊天界面的缓存
        let temp = localStorage.getItem('contentList')
        let friendUid = this.$route.query.friendUid
        let isIn = false
        if (temp) {
          let tempData = null
          temp = JSON.parse(temp)
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].friendUid === friendUid) {
              // 存在
              temp[i].lable = text
              isIn = true
              tempData = temp[i]
              temp.splice(i,1)
              break
            }
          }
          if (!isIn) {
            temp.unshift({
              title: msg.data.nickname,
              lable: text,
              to: '/chatting?friendUid=' + friendUid,
              friendUid: friendUid
            })
          } else {
            temp.unshift(tempData)
            tempData = null
          }
        } else {
          temp = []
          temp.push({
            title: msg.data.nickname,
            lable: text,
            to: '/chatting?friendUid=' + friendUid,
            friendUid: friendUid
          })
        }
        temp = JSON.stringify(temp)
        localStorage.setItem('contentList', temp)
      },
      getUserInfo() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.post('/api/getUserInfo', {
          uid: localStorage.getItem('uid'),
          friend_uid: this.$route.query.friendUid
        }).then(res => {
          let msg = res.data
          if (!msg.errcode) {
            this.title = msg.data.nickname
            this.$mint.Indicator.close()
            this.dataOpe(msg, '')
          } else {
            this.$mint.Toast(msg.msg, 1000)
          }
        })
        let subScribeType = localStorage.getItem('uid')
        this.sockets.subscribe(subScribeType, (msg) => {
          this.dataOpe('', msg.text)
          this.saveChatText({text: msg.text,isMe: false})
        })
      }
    },
    created() {
      this.getUserInfo()
      this.messageSent = this.saveChatText()
    },
    mounted() {
      this.$refs.inputArea.focus()
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
