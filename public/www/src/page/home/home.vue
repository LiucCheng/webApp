<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-1">
        <collection v-for="(item, index) in titleList" :key="index" :text="item.text"></collection>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-2">
        <mt-cell v-for="n in 10" :key="n" title="tab-2"></mt-cell>
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
        发现
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
        title: '首页',
        selected: 'tab_1',
        active: 'tab-1',
        titleList: [{
          text: '爆笑段子'
        },{
          text: '寓意人生'
        },{
          text: '失恋治疗'
        },{
          text: '励志名言'
        },{
          text: '励志名言'
        },{
          text: '励志名言'
        },{
          text: '励志名言'
        }]
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
      }
    },
    created() {
      this.$mint.Indicator.open('加载中')
      this.titleD = titleData.data
      this.ajax.get('/api/getList').then(res => {
        let msg = res.data
        if (!msg.errcode) {
          this.$mint.Indicator.close()
          this.titleD = msg.data
        }
      })
    }
  }
</script>
<style scoped>
  @import "home.css";
</style>
