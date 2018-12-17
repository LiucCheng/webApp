<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link v-if="isFriendRightShow" to="/addFriend" slot="right">
        <mt-button>添加朋友</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
    <lc-tab :list="list"></lc-tab>
  </div>
</template>
<script>
  import titleData from '../../data/title.json'
  export default {
    data() {
      return {
        list: [{
          title: '聊天',
          to: '/chat'
        },{
          title: '通讯录',
          to: '/friend'
        },{
          title: '发现',
          to: '/goods'
        },{
          title: '我的',
          to: '/me'
        }],
        popupVisible: false,
        title: '首页',
        articleTitle: '', // tab2 新增的类型
        selectValue: '',
        selectArticleID: '',
        textInput: '',
        allLoaded: false,
        count: 0,
        titleList: [],
        slots: [
          {
            values: [],
            textAlign: 'center'
          }
        ],
        // 我的界面
        account: '',
        pwd: '',
        pwdSure: '',
        registerD: true,
        isFriendRightShow: false
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/friend') {
          this.isFriendRightShow = true
        } else {
          this.isFriendRightShow = false
        }
      }
    },
    methods: {
      showDetail(index) {
        this.$router.push({
          path: '/detail?id=' + index
        })
      },
      onValuesChange(picker, values) {
        this.selectValue = values[0]
        for (let i = 0; i < this.titleList.length; i++) {
          if (this.selectValue === this.titleList[i].title) {
            this.selectArticleID = this.titleList[i].id
          }
        }
        console.log(this.selectArticleID)
      },
      closePop() {
        this.popupVisible = false
      },
      show() {
        this.popupVisible = true
      },
      loadTop() {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded()
        },2000)
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
    },
    created() {
      this.$mint.Indicator.open('加载中')
      this.$ajax.get('/api/getList').then(res => {
        let msg = res.data
        console.log(msg,' -------- ')
        if (!msg.errcode) {
          this.titleList = msg.data
          for (let i = 0; i < msg.data.length; i++) {
            this.slots[0].values.push(msg.data[i].title)
          }
          console.log(this.slots)
          this.$mint.Indicator.close()
        }
      })
      if (this.$route.path === '/friend') {
        this.isFriendRightShow = true
      }
    }
  }
</script>
<style scoped>
  @import "home.css";
</style>
