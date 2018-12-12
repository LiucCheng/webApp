<template>
  <div>
    <mt-header fixed title="类专题">
      <div to="/" slot="left">
        <mt-button icon="back" @click="historyBack()">返回</mt-button>
      </div>
    </mt-header>
    <div class="margin"></div>
    <mt-cell v-for="(item, index) in list" :key="index" :title="item.title" is-link :to="'/detail?list_id=' + item.list_id + '&article_id=' + item.article_id"></mt-cell>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      historyBack() {
        this.$router.back()
      },
      getData() {
        this.$mint.Indicator.open('加载中')
        this.$ajax.get('/api/getTypeList', {
          params: {
            id: this.$route.query.id
          }
        }).then(res => {
          let msg = res.data
          this.$mint.Indicator.close()
          if (!msg.errcode) {
            this.list = msg.data
          }
          console.log(msg, '---')
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped>
  @import "./contentList.css";
</style>
