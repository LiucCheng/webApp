<template>
  <div class="detail">
    <mt-header fixed :title="title">
      <div to="/" slot="left">
        <mt-button icon="back" @click="historyBack()">返回</mt-button>
      </div>
    </mt-header>
    <div class="detail_show">{{detail}}</div>
    <div class="img_box"><img :src="src"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '',
        detail: '',
        src: ''
      }
    },
    methods: {
      historyBack() {
        this.$router.back()
      }
    },
    created() {
      this.$mint.Indicator.open('加载中')
      this.$ajax.get('/api/getTypeText', {
        params: {
          list_id: this.$route.query.list_id, // 文章内容的id
          article_id: this.$route.query.article_id
        }
      }).then(res => {
        let msg = res.data
        this.$mint.Indicator.close()
        if (!msg.errcode) {
          this.title = msg.data.title
          this.detail = msg.data.text
        }
      })
    }
  }
</script>
<style scoped>
  @import "detail.css";
</style>
