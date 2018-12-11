<template>
  <div class="detail">
    <navigation :title="title"></navigation>
    <div class="detail_show">{{detail}}</div>
    <div class="img_box"><img :src="src"></div>
  </div>
</template>
<script>
  import DetailData from '../../data/title.json'
  export default {
    data() {
      return {
        title: '',
        detail: '',
        src: ''
      }
    },
    created() {
      let id = this.$route.query.id
      id = parseInt(id)
      this.ajax.get('/api/getList').then(res => {
        let msg = res.data
        console.log(msg.data[id])
        if (!msg.errcode) {
          this.detail = msg.data[id].text
          this.title = msg.data[id].title
          this.src = msg.data[id].text_img
        }
      })
    }
  }
</script>
<style scoped>
  @import "detail.css";
</style>
