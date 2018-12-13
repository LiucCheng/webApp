<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!--<mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-1">
        <lc-login-cell title="登录账号" placeholder="请输入登录账号" :lc-model="account" @lcInput="accountInput"></lc-login-cell>
        <lc-login-cell title="设置密码" placeholder="请输入密码" :lc-model="pwd" @lcInput="pwdInput" lcType="password"></lc-login-cell>
        <lc-login-cell title="确认密码" placeholder="请输入密码" :lc-model="pwdSure" @lcInput="pwdSureInput" lcType="password"></lc-login-cell>
        <div class="submit_btn">
          <mt-button type="primary" size="large" :disabled="registerD" @click.native="registerAccount">注册</mt-button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-2">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="true" :autoFill="false" ref="loadmore">
          <div class="box_collection">
            <collection v-for="(item, index) in titleList" :key="index" :text="item.title" :id="item.id"></collection>
          </div>
          <div class="no_data_line">已加载完</div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-3">
        <mt-popup v-model="popupVisible" position="bottom">
          <mt-picker :slots="slots" :showToolbar="true" @change="onValuesChange">
            <div class="pic_title">请选择类型 <span class="pic_close" @click="closePop">关闭</span></div>
          </mt-picker>
        </mt-popup>
        <div class="lc_cell" @click="show">
          <span class="name">请选择类型</span>
          <span class="value">{{selectValue}}</span>
        </div>
        <mt-field label="标题名" placeholder="请输入标题名15字以内" :attr="{maxlength: 15}" v-model="articleTitle"></mt-field>
        <mt-field label="文章内容" v-model="textInput" placeholder="文章内容500字以内" :attr="{maxlength: 500}" type="textarea" rows="8"></mt-field>
        <mt-button type="primary" size="large" disabled>提交内容</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-4">
        <mt-cell v-for="n in 10" :key="n" title="tab-2"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>-->
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
          title: '趣闻',
          to: '/goods'
        },{
          title: '贡献',
          to: '/found'
        },{
          title: '我的',
          to: '/me'
        }],
        popupVisible: false,
        title: '首页',
        selected: 'tab_1',
        active: 'tab-1',
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
        registerD: true
      }
    },
    watch: {
      selected(newVal) {
        let id = newVal.split('_')[1]
        this.active = 'tab-' + id
        if (id === '1') {
          this.title = '聊天室'
        } else if (id === '2') {
          this.title = '首页'
        } else if (id === '3') {
          this.title = '添加'
        } else {
          this.title = '我的'
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
    }
  }
</script>
<style scoped>
  @import "home.css";
</style>
