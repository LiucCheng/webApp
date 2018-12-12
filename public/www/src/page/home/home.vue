<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-1">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="true" :autoFill="false" ref="loadmore">
          <div class="box_collection">
            <collection v-for="(item, index) in titleList" :key="index" :text="item.title" :id="item.id"></collection>
          </div>
          <div class="no_data_line">已加载完</div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-2">
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
        <mt-field label="文章内容" placeholder="文章内容500字以内" :attr="{maxlength: 500}" type="textarea" rows="8" v-modal="textContent"></mt-field>
        <mt-button type="primary" size="large" disabled>提交内容</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-3">
        <mt-cell v-for="n in 10" :key="n" title="tab-2"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="tab_1">
        <img slot="icon" src="../../assets/common/i_01.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="tab_2">
        <img slot="icon" src="../../assets/common/i_03.png">
        贡献智囊
      </mt-tab-item>
      <mt-tab-item id="tab_3">
        <img slot="icon" src="../../assets/common/i_04.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import titleData from '../../data/title.json'
  export default {
    data() {
      return {
        popupVisible: false,
        title: '首页',
        selected: 'tab_1',
        active: 'tab-1',
        articleTitle: '', // tab2 新增的类型
        selectValue: '',
        selectArticleID: '',
        textContent: '',
        allLoaded: false,
        count: 0,
        titleList: [],
        slots: [
          {
            values: [],
            textAlign: 'center'
          }
        ]
      }
    },
    watch: {
      selected(newVal) {
        let id = newVal.split('_')[1]
        this.active = 'tab-' + id
        if (id === '1') {
          this.title = '首页'
        } else if (id === '2') {
          this.title = '发现'
        } else if (id === '3') {
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
      loadMore() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2500)
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
